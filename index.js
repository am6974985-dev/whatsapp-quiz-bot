const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
  },
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--no-zygote', '--single-process', '--disable-extensions']
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('البوت جاهز ✅');
});

const questions = [
  { q: "ما هي عاصمة السودان؟\n1- الخرطوم\n2- مدني\n3- بورتسودان", a: "1" },
  { q: "كم 2 + 2 ؟\n1- 3\n2- 4\n3- 5", a: "2" },
  { q: "ما هو أكبر كوكب؟\n1- الأرض\n2- المشتري\n3- المريخ", a: "2" },
];

let users = {};

client.on('message', async (msg) => {
  try {
    if (msg.from.includes('@g.us')) return;
    const text = msg.body.trim().toLowerCase();
    const chatId = msg.from;

    if (text === 'كويز' || text === 'quiz' || text === 'ابدأ' || text === 'start') {
      users[chatId] = { index: 0, score: 0 };
      await msg.reply('أهلاً بيك في الكويز 🎉\nجاوب برقم الإجابة\n\n' + questions[0].q);
      return;
    }

    if (users[chatId]) {
      let u = users[chatId];
      let current = questions[u.index];
      if (text === current.a) {
        u.score++;
        await msg.reply('صح ✅');
      } else {
        await msg.reply('غلط ❌ الإجابة الصح: ' + current.a);
      }
      u.index++;
      if (u.index < questions.length) {
        await msg.reply(questions[u.index].q);
      } else {
        await msg.reply(`خلص الكويز 🎉\nنتيجتك: ${u.score} من ${questions.length}`);
        delete users[chatId];
      }
    }
  } catch (e) {
    console.log('خطأ:', e.message);
  }
});

client.initialize();
