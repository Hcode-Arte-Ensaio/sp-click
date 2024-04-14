const validEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida os campos de um formulário de registro.
 * @param {string} userName - O nome de usuário fornecido no formulário.
 * @param {string} email - O endereço de e-mail fornecido no formulário.
 * @param {string} password - A senha fornecida no formulário.
 * @returns {{ valid: boolean, msg: string }} Um objeto contendo um indicador de validade e uma mensagem de erro, se houver.
 */
export const validForm = (
  userName: string,
  email: string,
  password: string
): { valid: boolean; msg?: string } => {
  console.log({ userName, email, password });

  if (userName.length < 0) {
    return { valid: false, msg: 'Defina um nome de usuáio válido!' };
  }

  if (!validEmail(email)) {
    return { valid: validEmail(email), msg: 'Defina um email válido!' };
  }

  if (password.length < 8) {
    return { valid: false, msg: 'Defina uma de pelo menos 8 dígitos!' };
  }

  return { valid: true };
};
