class SortCard  {
  constructor() {
    this.selectDOM = document.getElementById('js-select');
    this.cardsDOM = document.getElementsByClassName('card');
    this.listDOM = document.getElementById('js-list');
    this.cardsData = []; // item -> {el:DOM,type 1}
    this.init();
  }
  init() {
    this.getData();
    this.setOption();
    this.setEvent();
    console.log(this.cardsData[0].el);
    this.fadeIn();
  }
  getData() {
    for (const card of this.cardsDOM) {
      const data = {
        el: card,
        type: card.dataset.type
      }
      this.cardsData.push(data);
    }
  }
  setOption() {
    let options = [];
    for (const data of this.cardsData) {
      const type = data.type;
      if(options.indexOf(type) == -1) {
        options.push(type);
      }
    }
    options.forEach((item,index) => {
      let option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      this.selectDOM.appendChild(option)
    });
  }
  setEvent() {
    this.selectDOM.addEventListener('change', (e) => {
      this.fadeOut();
      const selectValue = e.target.value;
      this.sortCard(selectValue);
    });
  }
  sortCard(value) {
    this.listDOM.textContent = '';
    this.cardsData.forEach((data) => {
      if(value === 'all') {
        this.listDOM.appendChild(data.el);
      }
      else if(value == data.type) {
        this.listDOM.appendChild(data.el);
      }
    });
    window.setTimeout(() => {
     this.fadeIn();
    },1);
  }
  fadeIn() {
      const newActives = document.getElementsByClassName('js-card');
      let i = 0;
      function frame() {
          newActives[i].classList.add('js-fadein');
          i++;
          if(i < newActives.length) {
            window.setTimeout(()=> {
              frame();
            },100);
          }
      };
      frame();
  }
  fadeOut() {
    const newActives = document.getElementsByClassName('js-card');
    for(const card of newActives) {
      card.classList.remove('js-fadein')
    }
  }
}
window.onload = () => {
  const start = new SortCard();
};
