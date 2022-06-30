// 相等运算符(==)比较规则
/**
 * 1. null == undefined  =>  true
 * 2. 数字与字符串比较，将字符串转换为数字后再进行比较
 * （undefined会转换为NaN，null转换为0，true转换为1，false转换为0，字符串调用Number方法转换。）。
 * 3. 布尔值与任何类型比较，先将布尔值转换为数字类型，再套用其他规则。
 * 4. 对象与字符串/数字比较，调用对象的valueOf方法或toString方法获取原始值，再比较。
 */

console.log('1. null == undefined => ', null == undefined); // true

console.log('2. 22 == "22" => ', 22 == '22');  // true
// 字符串 22a会转换为NaN
console.log('2. 22 == "22a" => ', 22 == '22a');  // false

// 先将布尔值true转换为数字1，再将字符串1转换为数字1
console.log('3. true == "1" => ', true == '1');  // true

console.log('4. {a: 1} == 1 => ', {a: 1} == 1); // false

// 调用了对象的toString方法获取了原始值[object Object]，再和字符串[object Object]比较
console.log('4. {a: 1} == "[object Object]" => ', {a: 1} == '[object Object]');  // true