import React from 'react';
import './css/style.sass';
import { IState } from './interface';

class App extends React.Component<unknown, IState> {
  nameInput: React.RefObject<HTMLInputElement>;

  emailInput: React.RefObject<HTMLInputElement>;

  phoneInput: React.RefObject<HTMLInputElement>;

  birthInput: React.RefObject<HTMLInputElement>;

  messageInput: React.RefObject<HTMLTextAreaElement>;

  form: React.RefObject<HTMLFormElement>;

  constructor(props: unknown) {
    super(props);
    this.nameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.birthInput = React.createRef();
    this.messageInput = React.createRef();
    this.form = React.createRef();
    this.state = {
      errorName: false,
      errorEmail: false,
      errorPhone: false,
      errorBirth: false,
      errorMessage: false,
      isValidate: false,
      isSuccess: false,
      isError: false,
    };
  }

  postRequest = (data: {}) => {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true);
      xhr.responseType = "json";
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onload = () => {
        if (xhr.status < 400) {
          res(xhr.response);
        } else {
          rej(xhr.response);
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }

  handleSubmitButton = async () => {
    window.event.preventDefault();
    const form = {
      nameInput: this.nameInput.current.value,
      emailInput: this.emailInput.current.value,
      phoneInput: this.phoneInput.current.value,
      birthInput: this.birthInput.current.value,
      messageInput: this.messageInput.current.value,
    };
    this.checkValid();
    if (this.state.isValidate) {
      setTimeout(() => {
        this.setState({ isValidate: false });
      }, 2000);
      await this.postRequest(form).then(() => {
        this.form.current.reset();
        this.setState({ isSuccess: true });
      }).catch(() => {
        this.setState({ isError: true });
      }).finally(() => {
        setTimeout(() => {
          this.setState({ isError: false, isSuccess: false });
        }, 2000)
      });
    }
  };

  checkValid = () => {
    this.checkValidName();
    this.checkValidEmail();
    this.checkValidPhone();
    this.checkValidBirth();
    this.checkValidMessage();
    if (this.state.errorName ||
      this.state.errorEmail ||
      this.state.errorPhone ||
      this.state.errorBirth ||
      this.state.errorMessage) {
        this.setState({ isValidate: true });
    } else {
      this.setState({ isValidate: false });
    }
  };

  toUpper = () => {
    setTimeout( () => {
      this.nameInput.current.value = this.nameInput.current.value.toUpperCase();
    }, 500);
    
  }

  checkValidName = () => {
    if (!/^[aA-zZ]{3,30} [aA-zZ]{3,30}$/.test(this.nameInput.current.value)) {
      this.setState({ errorName: true });
    } else {
      this.setState({ errorName: false });
    }
  }

  checkValidEmail = () => {
    if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(this.emailInput.current.value)) {
      this.setState({ errorEmail: true });
    } else {
      this.setState({ errorEmail: false });
    }
  }

  checkValidPhone = () => {
    if (!/^[+][7] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/.test(this.phoneInput.current.value)) {
      this.setState({ errorPhone: true });
    } else {
      this.setState({ errorPhone: false });
    }
  }

  checkValidBirth = () => {
    if (this.birthInput.current.value === '') {
      this.setState({ errorBirth: true });
    } else {
      this.setState({ errorBirth: false });
    }
  }

  checkValidMessage = () => {
    if (this.messageInput.current.value.length < 10 ||
        this.messageInput.current.value.length > 300 ) {
      this.setState({ errorMessage: true });
    } else {
      this.setState({ errorMessage: false });
    }
  }

  render() {
    return (
      <><main className="main">
        <form
          className="form"
          name="form"
          noValidate
          onSubmit={this.handleSubmitButton}
          ref={this.form}
        >
          <label className="form__name form-text" onBlur={this.checkValidName}>
            <span>Имя и Фамилия:</span>
            <input type="text"
              placeholder="ALEX PETROV"
              name="name"
              ref={this.nameInput}
              onChange={this.toUpper} />
          </label>
          {this.state.errorName && (
            <p className="not-valid">Должно содержать два слова и пробел между ними</p>
          )}
          <label className="form__email form-text" onBlur={this.checkValidEmail}>
            <span>Email:</span>
            <input type="text" name="email" placeholder="example@mail.com" ref={this.emailInput} />
          </label>
          {this.state.errorEmail && (
            <p className="not-valid email">Неверно указан Email. Пример: example@mail.com</p>
          )}
          <label className="form__phone form-text" onBlur={this.checkValidPhone}>
            <span>Номер телефона:</span>
            <input type="tel" placeholder="+7 (111) 111-11-11" name="phone" ref={this.phoneInput} />
          </label>
          {this.state.errorPhone && (
            <p className="not-valid phone">Неверно указан номер. Пример: +7 (111) 111-11-11</p>
          )}
          <label className="form__birth form-text" onBlur={this.checkValidBirth}>
            <span>Дата рождения:</span>
            <input type="date" name="birth" placeholder="выберите дату" ref={this.birthInput} />
          </label>
          {this.state.errorBirth && <p className="not-valid birth">Выберете дату</p>}
          <label className="form__message form-text" onBlur={this.checkValidMessage}>
            <span>Сообщение:</span>
            <textarea name="message" placeholder="введите Ваше сообщение" ref={this.messageInput} />
          </label>
          {this.state.errorMessage && (
            <p className="not-valid message">Поле должно содержать от 10 до 300 символов</p>
          )}
          <div className="form__button">
            <button className="submit-button">
              Отправить
            </button>
          </div>
        </form>
      </main>
      {this.state.isSuccess && <p id="valid-submit">Success request!</p>}
      {this.state.isError && <p id="valid-submit">Wrong request!</p>}
      </>
    );
  }
}

export default App;
