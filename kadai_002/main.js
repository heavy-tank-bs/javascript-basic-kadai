// 文字の表示

let untyped = '';
let typed = '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typeCountNumber = document.getElementById('typeCountNumber');

// 文字の表示
const textLists = [
'Hello World','This is my App','How are you?',
'Today is sunny','I love JavaScript!','Good morning',
'I am Japanese','Let it be','Samurai',
'Typing Game','Information Technology',
'I want to be a programmer','What day is today?',
'I want to build a web app','Nice to meet you',
'Chrome Firefox Edge Safari','machine learning',
'Brendan Eich','John Resig','React Vue Angular',
'Netscape Communications','undefined null NaN',
'Thank you very much','Google Apple Facebook Amazon',
'ECMAScript','console.log','for while if switch',
'var let const','Windows Mac Linux iOS Android',
'programming'
];

const createText = () => {
  typed = '';
  typedfield.textContent = typed;

  let random = Math.floor(Math.random() * textLists.length);

  untyped = textLists[random];
  untypedfield.textContent = untyped
};

// キー入力の判定
const keyPress = e => {

  if (e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  score++
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  typeCount();

  if (untyped === '') {
    createText();
  }
};

// タイピングスキルのランク判定
const rankCheck = score => {
  let text = ''

  if (score < 100) {
    text = `あなたのランクはCです。 \nBランクまであと${100 - score}文字です`
  } else if (score < 200) {
    text = `あなたのランクはBです。 \nAランクまであと${200 - score}文字です`
  } else if (score < 300) {
    text = `あなたのランクはAです。 \nSランクまであと${300 - score}文字です`
  } else {
    text = `あなたのランクはSです。 \nおめでとうございます！`
  }

  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲーム終了時の処理
const gameOver = id => {
  clearInterval(id);

  wrap.textContent='タイムアップ！';

  setTimeout(() => {
    const result = confirm(rankCheck(score));

    if (result) {
      window.location.reload();
    }
  }, 10);
};


// カウントダウンタイマー
const timer = () => {
  let time = count.textContent;

  const id = setInterval(() => {
    time--;
    count.textContent = time;

    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
  timer();

  createText();

  typeCount();

  start.style.display = 'none';

  document.addEventListener('keypress', keyPress);

  timeout();
});

untypedfield.textContent = 'スタートボタンで表示';

// 現在のタイプ数を表示
const typeCount = () => {
  // typeCountNumber に含まれるすべての子ノードを取得
  const existingCountElement = typeCountNumber.querySelector('p');

  // 既存の <p> 要素が存在する場合、そのテキストを更新
  if (existingCountElement) {
    existingCountElement.textContent = score;
  } else {
    // 既存の <p> 要素が存在しない場合、新しい要素を作成して追加
    const countNumber = document.createElement('p');
    countNumber.textContent = score;
    typeCountNumber.appendChild(countNumber);
  }
};