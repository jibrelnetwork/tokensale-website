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
          isInvalid: 'Неправильный email',
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
        password: 'Пароль',
      },
      errors: {
        email: {
          isRequired: 'Необходимо указать email',
          isInvalid: 'Неправильный email',
        },
        captcha: {
          isRequired: 'Необходимо заполнить капчу',
        },
        password: {
          isRequired: 'Необходимо указать пароль',
          isTooShort: 'Пароль слишком короткий',
        },
      },
      links: {
        resendEmail: 'Не получили письмо в подтверждением?',
        resetPassword: 'Забыли пароль?',
      },
      submit: 'Войти',
    },
    registration: {
      fields: {
        email: 'Email',
        password: 'Пароль',
        passwordConfirm: 'Повтор пароля',
      },
      errors: {
        email: {
          isInvalid: 'Неправильный email',
          isRequired: 'Необходимо указать email',
          isForbidden: 'Электронная почта на hanmail.net не может быть использована',
        },
        captcha: {
          isRequired: 'Необходимо заполнить капчу',
        },
        password: {
          isRequired: 'Необходимо указать пароль',
          isTooShort: 'Пароль слишком короткий',
        },
        passwordConfirm: {
          notMatch: 'Пароли не совпадают',
          isRequired: 'Необходимо повторно указать пароль',
        },
      },
      links: {
        login: 'Уже есть аккаунт?',
      },
      submit: 'Зарегистрироваться',
    },
  },
  account: {
    logout: 'Выйти',
    balance: 'Баланс - {{amount}}',
    KYCStatus: {
      label: 'Статус верификации',
      variants: {
        pending: 'Ожидание',
        approved: 'Подтверждено',
        declined: 'Отклонено',
      },
    },
    verificationDeclined: 'Мы не смогли верифицировать ваш аккаунт. \n Пожалуйста свяжитесь с {{support}} чтобы мы смогли выполнить верификацию \n в ручном режиме.',
    support: 'командой поддержки',
    ethAddress: 'Ваш ETH адрес',
    icoAddresses: {
      eth: 'Адрес ETH для участия в ICO',
      btc: 'Адрес BTC для участия в ICO',
      notAvailable: 'Не доступно',
    },
    withdraw: {
      button: 'Вывод JNT',
    },
    transactions: {
      empty: 'Ваши ETH/BTC транзакции будут отображены здесь. \n Перевод может обрабатываться до 90 минут',
      filters: {
        all: 'Все транзакции',
        incoming: 'Входящие транзакции',
        outgoing: 'Выводы JNT',
      },
      transaction: {
        date: 'Дата',
        amount: 'Количество',
        TXHash: 'Хэш транзакции',
        comment: 'Комментарий',
      },
    },
    setETHAddress: {
      button: 'Добавить ETH адрес',
      title: 'Установка ETH адреса',
      fields: {
        address: 'ETH адрес',
      },
      errors: {
        address: {
          isRequired: 'Необходимо указать ETH адрес',
          invalid: 'Неправильный ETH адрес',
        },
      },
      submit: 'Установить',
    },
    withdrawTokens: {
      info: {
        available: 'Вы отправляете {{tokensAmount}} JNT токенов на ваш ETH адрес - {{ethAddress}}',
        unavailable: 'Вывод JNT будет доступен после 15 декабря 2017 года',
      },
      submit: 'Закрыть',
    },
    changePassword: {
      button: 'Изменить пароль',
      title: 'Изменение пароля',
      fields: {
        oldPassword: 'Старый пароль',
        newPassword: 'Новый пароль',
        newPasswordConfirm: 'Повтор нового пароля',
      },
      errors: {
        oldPassword: {
          isRequired: 'Необходимо указать старый пароль',
        },
        newPassword: {
          isRequired: 'Необходимо указать новый пароль',
          isTooShort: 'Новый пароль слишком короткий',
        },
        newPasswordConfirm: {
          notMatch: 'Новый и старый',
        },
      },
      submit: 'Изменить',
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
        firstName: 'Имя',
        lastName: 'Фамилия',
        birthday: 'Дата рождения',
        residency: 'Место жительства',
        citizenship: 'Гражданство',
      },
      errors: {
        firstName: {
          isRequired: 'Укажите ваше имя',
        },
        lastName: {
          isRequired: 'Укажите вашу фамилию',
        },
        birthday: {
          isRequired: 'Укажите дату рождения',
        },
        residency: {
          isRequired: 'Укажите ваше место жительства',
        },
        citizenship: {
          isRequired: 'Укажите ваше гражданство',
        },
      },
      submit: 'Далее',
    },
    document: {
      modal: {
        close: 'Загрузить сейчас',
        message: 'Загрузка скана паспорта необходима для завершения процесса верификации и вывода JNT. Вы можете завершить этот шаг позже',
        skipUpload: 'Загрузить потом',
      },
      fields: {
        uploader: 'Загрузите скан вашего паспорта',
      },
      errors: {
        uploader: {
          isRequired: 'Для завершения верификации необходимо загрузить скан паспорта',
        },
      },
      skip: 'Пропустить',
      goBack: 'Назад',
      submit: 'Далее',
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
        approved: 'Процедура верификации успешно завершена',
        declined: 'В данный момент нам не удалось выполнить верификацию вашего аккаунта',
        'preliminarily approved': 'Ваша заявка на верификацию принята и находится на рассмотрении. \n Возможно нам понадобится дополнительная информация для завершения процедуры верификации',
      },
      close: 'Перейти личный кабинет',
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
