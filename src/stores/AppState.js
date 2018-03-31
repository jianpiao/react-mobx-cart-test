import {observable, useStrict, action, computed} from 'mobx'; //  引入mobx对应的方法
import {data} from '../data/data'; //  获取数据


useStrict(true);  //  开启严格模式

function findById(list, id) {
  return list.filter(z => z.id === id)[0];
}

//  给取来的数据添加一个checked属性 用来给全选框 设定属性的
//  ...z 是es6的扩展运算符  不明白可以尝试 在return之前加入 console.log(JSON.stringify(z)) 打印到控制太查看
const dataList = data.map((z) => {
  return {
    checked: false,
    ...z
  }
});



//  这个里面就是store的仓库   负责存取数据    改变数据  和计算数据
export default class AppState {

  //  列表的默认值
  @observable list = dataList;
  //  全选框默认属性 为   未全选
  @observable checkedAll = false;

  //  删除操作
  @action removeItem = (id) => {
    this.list.forEach((item, i) => {
      if (item.id === id) {
        this.list.splice(i, 1);
      }
    });
    //  遍历列表的每一项 判断所有都为true的话就 让 checkedAll = true 反之
    this.list.every((item) => item.checked === true) ? this.checkedAll = true : this.checkedAll = false;
  };

  //  增加数量
  @action add = (id) => {
    this.list.forEach(item => item.id === id && item.buyNum++);
  };

  //  减少数量
  @action sub = (id) => {
    this.list.forEach(item => (item.id === id && item.buyNum > 0) && item.buyNum--);
  };

  //  点击单个选中 改变状态
  @action onChecked = (id) => {
    this.list.forEach(item => {
      if (item.id === id) {
        //  遍历列表  利用key选中对应项  把属性反选
        item.checked = !item.checked;
      }
    });
    //  遍历列表的每一项 判断所有都为true的话就 让 checkedAll = true 反之
    this.list.every((item) => item.checked === true) ? this.checkedAll = true : this.checkedAll = false;
  };

  //  点击全选框  改变状态
  @action onCheckedAll = () => {
    this.checkedAll = !this.checkedAll;
    this.checkedAll ? this.list.forEach(item => item.checked = true) : this.list.forEach(item => item.checked = false);
  };


  //  计算合计
  @computed get totalPrice() {
    console.log('计算总和')

    let total = 0;
    this.list.forEach((item, i) => {
      if (item.checked) {
        total += this.list[i].buyNum * this.list[i].price;
      }
    });
    return total;
  }
}