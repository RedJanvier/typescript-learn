export default {
  email: (mail: string) => {
    const regex = /^([-\w\d]{1,25})@([a-z]{4,20})\.([a-z]{2,5})(\.[a-z]{2,6})*$/;
    return regex.test(mail);
  },
  phone: (number: string) => {
    const regex = /^(\+?25)?07([3 2 8])+([0-9]{7})$/;
    return regex.test(number);
  },
  nid: (value: string) => {
    const regex = /^(1)([1 2])([0-9]){3}([7 8]){1}([0-9]){9}([1 2 3])$/;
    return regex.test(value);
  },
};
