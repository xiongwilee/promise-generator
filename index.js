module.exports = promiseGenerator;

/**
 * 多个promise顺序执行器
 * @param  {Array} arr  数组，每个元素均为function，每个function均返回Promise
 * @return {Object}     Pormise
 */
function promiseGenerator(arr) {
  const data = [];
  const last = Symbol('last');
  
  // 添加迭代队列，以获取最后一次的promise执行结果
  arr.push(last);

  return arr.reduce((sum, value, index) => {
    return sum.then((result) => {
      // 忽略初始数据，即Promise.resolve()的返回数据
      if (index !== 0) data.push(result);

      // 如果到最后一个节点，则完成迭代，返回总体数据
      if (value === last) return data;

      return value();
    })
  }, Promise.resolve())
}