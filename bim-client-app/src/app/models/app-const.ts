export class AppConst {


  static ORIGIN_URL = window.location.origin;
  static HOST = `${AppConst.ORIGIN_URL}/api`;
  static LOGIN_URL = `${AppConst.HOST}/login`;
  static LOGIN_VALIDATION_URL = `${AppConst.LOGIN_URL}/validated`;
  static USER_DETAILS_URL = `${AppConst.HOST}/currentUser`;
  static LOGOUT_URL = `${AppConst.HOST}/logout`;
  static BOOK_URL = `${AppConst.HOST}/book`;
  static ISSUED_BOOK_URL = `${AppConst.HOST}/issueBook/issued`;
  static AVAILABLE_BOOK_URL = `${AppConst.HOST}/issueBook/available`;
}
