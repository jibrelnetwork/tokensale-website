/* eslint-disable max-len */
const RU = {
  auth: {
    emailVerification: {
      error: {
        message: 'К сожалению, мы не смогли верифицировать ваш email. \n Попробуйте еще раз или свяжитесь с нами по {{email}}',
        email: 'электронной почте',
      },
      success: 'Ваш адрес электронной почты подтвержден!',
      inProgress: 'Подтверждение электронной почты...',
      linkSended: 'На вашу электронную почту отправлено письмо с подтверждением. \n Может пройти несколько минут, прежде чем вы его получите. \n Перейдите по ссылке в письме для подтверждения вашей электронной почты.',
      continue: 'Продолжить',
      complete: 'Войти',
    },
    resetPasswordLinkSended: 'На вашу электронную почту отправлено письмо с подтверждением. \n Может пройти несколько минут, прежде чем вы его получите. \n Перейдите по ссылке в письме для сброса пароля.',
    sendResetPasswordEmail: {
      fields: {
        email: 'Ваш email',
      },
      errors: {
        email: {
          isRequired: 'Необходимо указать email',
          invalidFormat: 'Неправильный email',
        },
      },
      submit: 'Изменить пароль',
    },
    resetPassword: {
      fields: {
        newPassword: 'Новый пароль',
        newPasswordConfirm: 'Повтор нового пароля',
      },
      errors: {
        newPassword: {
          isRequired: 'Необходимо указать пароль',
          isTooShort: 'Пароль слишком короткий',
        },
        newPasswordConfirm: {
          notMatch: 'Пароли не совпадают',
          isRequired: 'Необходимо повторно указать пароль',
        },
      },
      submit: 'Изменить пароль',
    },
    login: {
      fields: {
        email: 'Email',
        password: 'Password',
      },
      errors: {
        email: {
          isRequired: 'Email address is required',
          isInvalid: 'Invalid email address',
        },
        password: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
      },
      links: {
        resendEmail: "Didn't receive email?",
        resetPassword: 'Forgotten password?',
      },
      submit: 'Login',
    },
    registration: {
      fields: {
        email: 'Email',
        password: 'Password',
        passwordConfirm: 'Password Confirmation',
      },
      errors: {
        email: {
          isRequired: 'Email address is required',
          isInvalid: 'Invalid email address',
        },
        captcha: {
          isRequired: 'Click on captcha checkbox',
        },
        password: {
          isRequired: 'Password is required',
          isTooShort: 'Password is too short',
        },
        newPasswordConfirm: {
          notMatch: 'Password does not match the confirm password',
          isRequired: 'Password confirmation is required',
        },
      },
      links: {
        registration: 'Have an account?',
      },
      submit: 'Register',
    },
  },
  account: {
    logout: 'Logout',
    KYCStatus: {
      label: 'KYC status',
      variants: {
        pending: 'Pending',
        approved: 'Approved',
        declined: 'Declined',
      },
    },
    icoNotStartedYet: 'Jibrel Network Token Sale starts on 27 November 2017 - 12:00 UTC.\n Your dedicated BTC and ETH contribution addresses will be shown here once the token sale starts.',
    verificationDeclined: 'It seems we were unable to verify your identity. \n Please contact the support team {{email}} and a representative \n will assist in manually processing your application.',
    ethAddress: 'Your address',
    addEthAddress: '',
    icoAddresses: {
      eth: 'Your ETH Contribution Address',
      btc: 'Your BTC Contribution Address',
    },
    transactions: {
      empty: 'The jWallet makes it easy and safe to store and transfer value of any tokens',
      filters: {
        all: 'All transactions',
        incoming: 'Incoming transactions',
        outgoing: 'JNT transfers',
      },
      transaction: {
        date: 'Date',
        amount: 'Amount',
        TXHash: 'TX hash',
      },
    },
    setETHAddress: {
      button: 'Add ETH Address',
      title: 'Set Address',
      fields: {
        address: 'Address',
      },
      errors: {
        address: {
          isRequired: 'Address is required',
          invalid: 'Invalid address',
        },
      },
      submit: 'Confirm',
    },
    withdrawTokens: {
      info: {
        available: 'You are sending {{tokensAmount}} JNT to your account address {{ethAddress}}',
        unavailable: 'JNT withdrawals will be available starting from 12:00 PM 15th Dec 2017',
      },
      submit: 'Got it!',
    },
    changePassword: {
      button: 'Change password',
      title: 'Set New Password',
      fields: {
        oldPassword: 'Old password',
        newPassword: 'New password',
        newPasswordConfirm: 'Confirm password',
      },
      errors: {
        oldPassword: {
          isRequired: 'Password is required',
        },
        newPassword: {
          isRequired: 'New Password is required',
          isTooShort: 'New Password is too short',
        },
        newPasswordConfirm: {
          notMatch: 'Passwords should match',
        },
      },
      submit: 'Confirm',
    },
  },
  verification: {
    logout: 'Выйти',
    stages: {
      terms: 'Условия и соглашения',
      userInfo: 'Основная информация',
      document: 'Загрузка документов',
    },
    terms: {
      link: {
        text: 'Условия продажи токенов',
        source: '/static/T&Cs - Jibrel Network Token Sale.pdf',
      },
      fields: {
        policyConfirm: 'Я прочитал(а) {{link}}, Политику конфиденциальности и Белую книгу Jibrel Network, и принимаю все условия, обязательства, представления и гарантии, изложенные в этих документах, и соглашаюсь придерживаться их и быть юридически ограничен(а) ими',
        citizenshipConfirm: 'Я подтверждаю, что я не являюсь гражданином, постоянным жителем и мне не предоставлено бессрочное право на пребывание в США, или какой-либо юрисдикции, в которой покупка токенов Jibrel Network (JNT) явно запрещена или незаконна.',
      },
      errors: {
        policyConfirm: {
          isRequired: 'Необходимо принять политику конфиденциальности',
        },
        citizenshipConfirm: {
          isRequired: 'Необходимо подтвердить гражданство',
        },
      },
      submit: 'Дальше',
    },
    userInfo: {
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        birthday: 'Birthday',
        residency: 'Residency',
        citizenship: 'Citizenship',
      },
      errors: {
        firstName: {
          isRequired: 'First name is required',
        },
        lastName: {
          isRequired: 'Last name is required',
        },
        birthday: {
          isRequired: 'Birthday is required',
        },
        residency: {
          isRequired: 'Residency is required',
        },
        citizenship: {
          isRequired: 'Citizenship is required',
        },
      },
      submit: 'Next Step',
    },
    document: {
      fields: {
        uploader: 'Загрузите скан вашего паспорта',
      },
      errors: {
        uploader: {
          isRequired: 'Для прохождения верификации необходимо загрузить скан паспорта',
        },
      },
      goBack: 'Назад',
    },
    loader: {
      stages: {
        uploading: 'Загрузка документов на KYC сервер',
        scanning: 'Обработка данных из документов',
        validity: 'Проверка документов',
        processing: 'Каталогизация информации',
        revise: 'Проверка на наличие запретов',
        decision: 'Принятие решения',
      },
      results: {
        pending: 'We are currently processing your application. \n Please note, we may request that you submit additional identity verification in the future',
        approved: 'Your identity has been verified \n and your application has been approved',
        declined: "We currently can't verify your identity",
      },
      close: 'Go to dashboard',
    },
  },
  index: {
    header: {
      about: 'О Jibrel Network',
      login: 'Войти',
      logout: 'Выйти',
      account: 'Перейти в аккаунт',
      registration: 'Зарегистрироваться',
      verification: 'Продолжить верификацию',
    },
    info: {
      price: {
        title: 'USD $0.25',
        text: 'Цена за токен',
      },
      currencies: {
        title: 'Эфириум, Биткоин',
        text: 'Принимаемые криптовалюты',
      },
      exchange: {
        title: '1 февраля 2018',
        text: 'JNT токен будет \n размещен на биржах',
      },
      jurisdictions: {
        title: 'Соединенные Штаты Америки',
        text: 'Запрещенные юрисдикции',
      },
    },
    title: {
      header: 'Глобальная токенизация',
      text: 'Jibrel предоставляет традиционные финансовые активы, \n в виде ERC-20 токенов на блокчейне Эфириума',
    },
    timer: {
      days: 'Дней',
      hours: 'Часов',
      minutes: 'Минут',
      seconds: 'Секунд',
    },
    button: 'Купить токены',
    tokens: {
      raised: 'Продано токенов',
      total: 'Всего токенов',
    },
  },
}
/* eslint-enable */

export default RU
