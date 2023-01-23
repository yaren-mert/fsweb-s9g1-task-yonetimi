import React from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskHookForm(props) {
  const { kisiler, submitFn, tasks } = props;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", description: "", people: [] },
  });

  let names = watch("people");
  const onSubmit = (data) => {
    let taskId = nanoid(5);
    submitFn({
      ...data,
      id: taskId,
      status: "yapılacak",
    });
    reset();
    notify(taskId);
  };

  const notify = (id) => {
    toast(`${id} numaralı iş eklenmiştir.`);
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          type="text "
          className="input-text"
          id="title"
          name="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>
      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          id="description"
          name="description"
          rows="3"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        />
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>
      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((item) => (
            <label className="input-checkbox" key={item} htmlFor={item}>
              <input
                type="checkbox"
                name="people"
                value={item}
                id={item}
                checked={names.includes(item)}
                {...register("people", {
                  validate: {
                    moreThanOne: (p) =>
                      p.length >= 1 || "Lütfen en az bir kişi seçin",
                    maxThree: (p) =>
                      p.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
              />
              {item}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>
      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
