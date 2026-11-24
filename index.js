const http = require('http');
http.createServer((req, res) => res.end('Bot is running')).listen(process.env.PORT || 3000);
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const GROUP_NAME = 'اسئلة';
const questions = [
`📚 سؤال اليوم (Lecture 1):
كم عدد حروف اللغة الإنجليزية؟
A) 24
B) 26
C) 28
D) 44
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 2):
كم عدد حروف العلة Vowels؟
A) 5
B) 6
C) 21
D) 24
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 2):
كم عدد أصوات اللغة الإنجليزية حسب IPA؟
A) 26
B) 36
C) 44
D) 50
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 2):
أي حرف يعتبر Semi-vowel؟
A) A
B) E
C) Y
D) Z
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 2):
كم عدد الـ Consonants؟
A) 5
B) 20
C) 21
D) 26
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 3):
The intelligent doctor examines the patient carefully.
كلمة intelligent شنو؟
A) Noun
B) Verb
C) Adjective
D) Adverb
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 3):
في نفس الجملة، كلمة doctor شنو؟
A) Verb
B) Noun
C) Adjective
D) Adverb
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 3):
كلمة carefully شنو؟
A) Adjective
B) Adverb
C) Noun
D) Verb
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 3):
كلمة examines شنو؟
A) Noun
B) Adjective
C) Verb
D) Article
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 3):
أي واحد من ديل Adverb؟
A) Beautiful
B) Tall
C) Quickly
D) Intelligent
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 4):
What is Grammar?
A) Only vocabulary
B) System of rules to form sentences
C) Only pronunciation
D) Only listening
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 4):
الفعل هو كلمة تعبر عن:
A) اسم فقط
B) عمل أو حدث أو حالة
C) صفة فقط
D) مكان فقط
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 4):
أي واحد من ديل Action Verb؟
A) Know
B) Believe
C) Run
D) Love
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 4):
أي واحد من ديل State Verb؟
A) Eat
B) Play
C) Understand
D) Write
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 4):
I ___ the lesson.
A) understands
B) understand
C) understanding
D) understood
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 5):
The heart ___ blood.
A) pump
B) pumps
C) pumping
D) pumped
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 5):
He ___ in a hospital.
A) work
B) works
C) working
D) worked
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 5):
She ___ coffee every morning.
A) drink
B) drinks
C) drinking
D) drank
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 5):
النفي بتاع: He plays tennis every Friday.
A) He not plays
B) He does not play
C) He do not play
D) He is not play
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 5):
السؤال بتاع: She studies medicine.
A) Do she study?
B) Does she study?
C) Is she study?
D) She study?
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 6):
Past of "go" is:
A) goed
B) went
C) gone
D) going
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 6):
Past of "eat" is:
A) eated
B) ate
C) eaten
D) eating
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 6):
I ___ football yesterday.
A) play
B) played
C) plays
D) playing
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 6):
أي واحد Regular Verb؟
A) Go - went
B) See - saw
C) Play - played
D) Buy - bought
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 6):
She ___ dinner last night.
A) cook
B) cooked
C) cooks
D) cooking
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 7):
She ___ studying at 7 o'clock yesterday.
A) was
B) is
C) were
D) are
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 7):
They ___ playing all day yesterday.
A) was
B) were
C) is
D) are
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 8):
Write + ing = ?
A) writting
B) writing
C) writeing
D) wroteing
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 8):
Run + ing = ?
A) runing
B) running
C) runned
D) runs
جاوب بـ A / B / C / D 👇`,
`📚 سؤال اليوم (Lecture 8):
أي واحد من ديل Signal word للـ Past Continuous؟
A) Yesterday
B) Last month
C) While
D) Two days ago
جاوب بـ A / B / C / D 👇`
];
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--no-zygote', '--single-process', '--disable-extensions']
  }
});
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('اعمل Scan بالرقم 0124267706');
});
client.on('ready', () => {
  console.log('البوت جاهز ✅');
});
let day = 0;
cron.schedule('0 8 * * *', async () => {
  try {
    const chats = await client.getChats();
    const group = chats.find(c => c.isGroup && c.name === GROUP_NAME);
    if (group) {
      await group.sendMessage(questions[day % questions.length]);
      day++;
    }
  } catch(e){ console.log(e); }
}, { timezone: 'Africa/Khartoum' });
client.initialize();
