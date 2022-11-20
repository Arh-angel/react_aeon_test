import apiAxios from '../network';

export default class MainService {
  static async getData() {
    return apiAxios.get('');
  }
}
