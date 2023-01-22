/** Libraries */
import * as Yup from 'yup';

export const YupRegisterValidations = Yup.object({
  name: Yup.string()
    .max(15, 'Debe tener 15 caracteres o menos')
    .required('El campo es requerido'),
  email: Yup.string()
    .email('Email inválido asegurate de colocar "@"')
    .required('El campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('El campo es requerido'),
});

export const YupLoginValidations = Yup.object({
  email: Yup.string()
    .email('Email inválido asegurate de colocar "@"')
    .required('El campo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('El campo es requerido'),
});
