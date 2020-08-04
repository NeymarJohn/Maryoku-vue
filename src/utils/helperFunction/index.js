
export const validFunc = (ctx, ...rest) => {
  const errors = []
}

// sort func for sorting wrong value in object

export function isWrong (obj, nameList) {
  var data = {}
  nameList.forEach(item => {
    if (obj[item]) { data[item] = obj[item] }
  })
  return data
}

export const cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const numberToWord = num => {
  let vm = this;
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';
  str += (n[1] != 0) ? (vm.a[Number(n[1])] || vm.b[n[1][0]] + ' ' + vm.a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (vm.a[Number(n[2])] || vm.b[n[2][0]] + ' ' + vm.a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (vm.a[Number(n[3])] || vm.b[n[3][0]] + ' ' + vm.a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (vm.a[Number(n[4])] || vm.b[n[4][0]] + ' ' + vm.a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (vm.a[Number(n[5])] || vm.b[n[5][0]] + ' ' + vm.a[n[5][1]]) : '';
  return str;
}

