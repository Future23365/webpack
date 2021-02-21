import '../css/index.scss';
import './print';

console.log('123');

function add() {
  console.log('333');
}

add();
// const a = () => {
//   console.log('3322');
// };
// a();

console.log('index.js文件被加载!@');
// console.log(Promise);

/*
 *js文件开启热更新
*/
if (module.hot) {
  // 一旦 module.hot 为true， 说明开启了HMR功能
  module.hot.accept('./print.js', () => {
    // 方法监听 print.js文件的变化，一旦发生变化，其他默认不重新打包构建
    // ....
  });
}
