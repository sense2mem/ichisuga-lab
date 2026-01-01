document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const resultElement = document.getElementById('result');
    const scrollContentElement = resultElement.querySelector('.scroll-content');
    const animationContainer = document.getElementById('animation-container');
    const omikujiBox = document.getElementById('omikuji-box');

    // 各運勢の詳細データ
    const fortuneTemplates = {
        '大吉': {
            details: {
                '願望': ['思うがまま、全て叶うでしょう', 'これ以上ないほど最高の結果に', '期待以上の成果が出るでしょう'],
                '恋愛': ['最高の相手が現れるでしょう', '運命の出会いがすぐそこに', '今の相手と更に仲が深まるでしょう'],
                '待ち人': ['すぐに現れるでしょう', '思わぬ場所で出会うでしょう', '良い知らせを持って現れるでしょう'],
                '商売': ['大きな利益を得るでしょう', '新しい事業が成功するでしょう', '笑いが止まらないほどの利益でしょう'],
                '健康': ['心身ともに充実するでしょう', '病はすぐに回復するでしょう', '力がみなぎり、絶好調でしょう'],
                '住居': ['良い場所が見つかるでしょう', '移転・改装は吉です', '理想の住まいが見つかるでしょう'],
                '旅立ち': ['素晴らしい旅になるでしょう', 'どこへ行っても幸運が待っているでしょう', '計画以上の楽しい旅になるでしょう'],
                'アドバイス': ['新しい挑戦に最適な1年です。積極的に行動しましょう。', '自信を持って進めば、道は開かれます。', '周りの人への感謝を忘れず、幸運を分かち合いましょう。']
            }
        },
        '中吉': {
            details: {
                '願望': ['努力すれば叶うでしょう', '時間をかければ成就するでしょう', '助けを借りれば実現するでしょう'],
                '恋愛': ['良い出会いが期待できるでしょう', '焦らず、自分を磨きましょう', '相手の良さを再確認できるでしょう'],
                '待ち人': ['少し待てば現れるでしょう', '便りがあってから、少し遅れて来るでしょう', '意外な人が待ち人かもしれません'],
                '商売': ['利益はまずまずでしょう', '堅実な経営を心がけましょう', '新しい取引先が見つかるでしょう'],
                '健康': ['油断は禁物です', '休養をしっかりと取りましょう', '軽い運動を始めると良いでしょう'],
                '住居': ['焦らず探しましょう', '今の場所も悪くありません', '専門家のアドバイスを聞きましょう'],
                '旅立ち': ['計画をしっかり立てましょう', '近場の旅が良いでしょう', '忘れ物に注意しましょう'],
                'アドバイス': ['地道な努力が実を結ぶ年。継続は力なり。', '目標を少し下げると、心穏やかに過ごせます。', '新しい知識やスキルの習得に励むと良いでしょう。']
            }
        },
        '小吉': {
            details: {
                '願望': ['小さな願いから叶うでしょう', '意外な形で願いが叶うでしょう', '欲張らなければ叶うでしょう'],
                '恋愛': ['身近なところに縁がありそうです', '友人からの紹介が期待できそうです', 'ゆっくりと関係を育みましょう'],
                '待ち人': ['便りがあるでしょう', '少し遅れてやってくるでしょう', '来るが、長居はしないでしょう'],
                '商売': ['少しずつ利益が出るでしょう', '現状維持を心がけましょう', '無駄な出費を抑えましょう'],
                '健康': ['無理をしなければ安泰です', '季節の変わり目に注意しましょう', 'バランスの取れた食事を心がけましょう'],
                '住居': ['今の場所も悪くありません', '改装は吉と出ます', '隣人との関係を大切にしましょう'],
                '旅立ち': ['近場が良いでしょう', '日帰りの旅が楽しめます', '計画通りには進まないかもしれません'],
                'アドバイス': ['周りの人への感謝を忘れずに。小さな幸せを見つけましょう。', '謙虚な姿勢が幸運を呼び込みます。', '目の前の仕事に集中すると良い結果が出ます。']
            }
        },
        '吉': {
            details: {
                '願望': ['誠実な行いが実を結ぶでしょう', '日々の努力が認められるでしょう', '思いがけない助けがあるでしょう'],
                '恋愛': ['誠意が伝わるでしょう', '穏やかな関係が続くでしょう', '飾らない自分を見せることが大切です'],
                '待ち人': ['遅れてやってくるでしょう', '忘れた頃にやってくるでしょう', '連れを伴ってやってくるでしょう'],
                '商売': ['堅実な商いを心がけましょう', '損はしないが、大きな利益もありません', '信用第一でいきましょう'],
                '健康': ['規則正しい生活を送りましょう', 'ストレスを溜めないようにしましょう', '病は回復に向かうでしょう'],
                '住居': ['現状維持が良いでしょう', '騒音トラブルに注意しましょう', '掃除をすると運気が上がります'],
                '旅立ち': ['準備を万端にしましょう', '急な旅立ちは避けた方が良いでしょう', '旅先での出会いに期待できそうです'],
                'アドバイス': ['基本に立ち返り、物事を丁寧に進めると良いでしょう。', '派手さより、誠実さを大切にすべき年です。', '家族や親しい友人との時間を大切にしましょう。']
            }
        },
        '凶': {
            details: {
                '願望': ['今は耐える時です', '高望みはしない方が良いでしょう', '邪魔が入る恐れがあります'],
                '恋愛': ['うまくいかないことが多いでしょう', '距離を置いた方が良いかもしれません', '誤解されやすい時期です'],
                '待ち人': ['現れないでしょう', '来てもすぐに去ってしまうでしょう', '悪い知らせを持ってくるかもしれません'],
                '商売': ['損失の恐れがあります', '新しいことは始めない方が良いでしょう', '契約は慎重に行いましょう'],
                '健康': ['注意が必要です', '持病が悪化する恐れがあります', '怪我に注意しましょう'],
                '住居': ['動かない方が良いでしょう', '家の修理が必要になるかもしれません', 'ご近所トラブルに注意しましょう'],
                '旅立ち': ['見送るのが賢明です', 'トラブルに巻き込まれる恐れがあります', '行くなら細心の注意を払いましょう'],
                'アドバイス': ['焦りは禁物。自分を見つめ直し、力を蓄える年にしましょう。', '言動を慎み、静かに過ごすのが良いでしょう。', '悪い流れは長く続きません。希望を捨てないで。']
            }
        },
        '大凶': {
            details: {
                '願望': ['叶い難いでしょう', '諦めるのが賢明です', '全てが裏目に出る恐れがあります'],
                '恋愛': ['諦めるのが賢明です', '別れの危機が訪れるかもしれません', '今は恋愛以外のことに集中しましょう'],
                '待ち人': ['現れないでしょう', '期待するだけ無駄でしょう', '災いを持ってくるかもしれません'],
                '商売': ['大きな損失の恐れがあります', '事業の縮小を考えましょう', '甘い話には絶対に乗らないように'],
                '健康': ['十分に注意してください', '病状が悪化する恐れがあります', '何事にも慎重に行動してください'],
                '住居': ['動かない方が良いでしょう', '早めに引っ越した方が良いかもしれません', '家庭内に不和が生じるかもしれません'],
                '旅立ち': ['中止すべきです', '行けば必ず後悔するでしょう', '大きな災難が待ち受けているでしょう'],
                'アドバイス': ['嵐が過ぎ去るのを待ちましょう。無理せず、静かに過ごすのが吉。', '何をしても裏目に出る時期。現状維持に徹しましょう。', '信頼できる人に相談し、助けを求めましょう。']
            }
        }
    };

    // 確率を調整するためのおみくじの「くじ箱」を作成
    const drawingPool = [
        ...Array(20).fill('大吉'),   // 10%
        ...Array(49).fill('中吉'),   // 24.5%
        ...Array(60).fill('吉'),     // 30%
        ...Array(50).fill('小吉'),   // 25%
        ...Array(20).fill('凶'),     // 10%
        ...Array(1).fill('大凶')     // 0.5%
    ];

drawButton.addEventListener('click', function() {
  drawButton.disabled = true;
  resultElement.classList.remove('visible');

  // 初期化
  animationContainer.classList.remove('hidden', 'phase2');
  omikujiBox.classList.remove('shaking', 'tilting');

  // 表示 & Phase1開始（呼吸＋浮遊）
  requestAnimationFrame(() => {
    animationContainer.classList.add('visible');
    omikujiBox.classList.add('shaking');
  });

  const TRIGGER = 1000;   // 8秒で覚醒
  const END     = 4500;  // 紙が出て余韻→終了（好みで調整OK）

  // 8秒後：Phase2（光バースト＋棒＋紙）
  setTimeout(() => {
    animationContainer.classList.add('phase2');
    omikujiBox.classList.remove('shaking');
    omikujiBox.classList.add('tilting');
  }, TRIGGER);

  // 終了：結果表示へ
  setTimeout(() => {
    animationContainer.classList.remove('visible');
    omikujiBox.classList.remove('tilting');

    drawFortune();
    drawButton.disabled = false;

    setTimeout(() => {
      animationContainer.classList.add('hidden');
      animationContainer.classList.remove('phase2');
      omikujiBox.classList.remove('shaking', 'tilting');
    }, 600);
  }, END);
});


    function drawFortune() {
        // くじ箱からランダムに運勢レベルを1つ選ぶ
        const randomLevel = drawingPool[Math.floor(Math.random() * drawingPool.length)];
        
        // 選ばれた運勢のテンプレートを取得
        const fortuneTemplate = fortuneTemplates[randomLevel];

        // 各項目からランダムに1つずつコメントを選んで、最終的な結果を作成
        const finalDetails = {};
        for (const [key, valueArray] of Object.entries(fortuneTemplate.details)) {
            const randomIndex = Math.floor(Math.random() * valueArray.length);
            finalDetails[key] = valueArray[randomIndex];
        }

        // 結果を表示するためのHTMLを生成
        let detailsHtml = '<ul class="details-list">';
        for (const [key, value] of Object.entries(finalDetails)) {
            detailsHtml += `<li><span>${key}</span>: ${value}</li>`;
        }
        detailsHtml += '</ul>';

        scrollContentElement.innerHTML = `
            <div class="fortune-level">${randomLevel}</div>
            ${detailsHtml}
        `;

        // 結果カードを表示
        resultElement.classList.add('visible');
    }
});
