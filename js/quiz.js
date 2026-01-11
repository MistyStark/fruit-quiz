const QUIZ_DATA = [
  {
    kanji: "苺",
    yomi: "いちご",
    memo: {
      text: "赤くて香りのよい果物です。\n表面のつぶつぶは実で、春に旬をむかえます。",
      season: "春",
      area: "栃木県・福岡県",
      image: "images/strawberry.jpg"
    }
  },
  {
    kanji: "蜜柑",
    yomi: "みかん",
    memo: {
      text: "冬の定番の柑橘です。\n皮がむきやすく、こたつのお供として親しまれます。",
      season: "冬",
      area: "愛媛県・和歌山県",
      image: "images/mikan.jpg"
    }
  },
  {
    kanji: "林檎",
    yomi: "りんご",
    memo: {
      text: "シャキッとした食感が特徴です。\n生食のほか、アップルパイなどにも使われます。",
      season: "秋〜冬",
      area: "青森県",
      image: "images/apple.jpg"
    }
  },
  {
    kanji: "葡萄",
    yomi: "ぶどう",
    memo: {
      text: "房になって実がなる果物です。\n品種が多く、ワインの原料にもなります。",
      season: "秋",
      area: "山梨県・長野県",
      image: "images/grape.jpg"
    }
  },
  {
    kanji: "西瓜",
    yomi: "すいか",
    memo: {
      text: "夏を代表する大きな果物です。\n水分が多く、暑い日に体を冷やしてくれます。",
      season: "夏",
      area: "熊本県・千葉県",
      image: "images/watermelon.jpg"
    }
  },
  {
    kanji: "桃",
    yomi: "もも",
    memo: {
      text: "やわらかい果肉と甘い香りが特徴です。\n夏に旬をむかえ、品種も豊富です。",
      season: "夏",
      area: "山梨県・福島県",
      image: "images/peach.jpg"
    }
  },
  {
    kanji: "柿",
    yomi: "かき",
    memo: {
      text: "秋の代表的な果物です。\n甘い「あま柿」と、渋みのある「渋柿」があります。",
      season: "秋",
      area: "奈良県・和歌山県",
      image: "images/persimmon.jpg"
    }
  },
  {
    kanji: "梨",
    yomi: "なし",
    memo: {
      text: "シャリっとした食感とみずみずしさが特徴です。\n日本の梨はさっぱりした甘さが人気です。",
      season: "秋",
      area: "千葉県・鳥取県",
      image: "images/pear.jpg"
    }
  },
  {
    kanji: "檸檬",
    yomi: "れもん",
    memo: {
      text: "すっぱい香りの強い柑橘です。\n飲み物やお菓子、料理にも広く使われます。",
      season: "冬",
      area: "広島県",
      image: "images/lemon.jpg"
    }
  },
  {
    kanji: "香蕉",
    yomi: "ばなな",
    memo: {
      text: "一年中出回る食べやすい果物です。\nエネルギーになりやすく、朝食にも人気です。",
      season: "一年中",
      area: "フィリピン",
      image: "images/banana.jpg"
    }
  },

  {
    kanji: "杏",
    yomi: "あんず",
    memo: {
      text: "小さくてオレンジ色の果物です。\nジャムやドライフルーツにもよく使われます。",
      season: "初夏",
      area: "長野県",
      image: "images/apricot.jpg"
    }
  },
  {
    kanji: "桜桃",
    yomi: "さくらんぼ",
    memo: {
      text: "赤くて小さい果物です。\n初夏に旬をむかえ、山形県が有名です。",
      season: "初夏",
      area: "山形県",
      image: "images/cherry.jpg"
    }
  },
  {
    kanji: "無花果",
    yomi: "いちじく",
    memo: {
      text: "中につぶつぶがある果物です。\n皮ごと食べることもあり、やさしい甘さです。",
      season: "秋",
      area: "愛知県",
      image: "images/fig.jpg"
    }
  },
  {
    kanji: "石榴",
    yomi: "ざくろ",
    memo: {
      text: "粒がたくさん詰まった果物です。\nジュースやシロップにも使われます。",
      season: "秋",
      area: "和歌山県",
      image: "images/pomegranate.jpg"
    }
  },
  {
    kanji: "桑の実",
    yomi: "くわのみ",
    memo: {
      text: "黒むらさき色の小さな果物です。\n甘ずっぱく、初夏に実ります。",
      season: "初夏",
      area: "各地",
      image: "images/mulberry.jpg"
    }
  },
  {
    kanji: "枇杷",
    yomi: "びわ",
    memo: {
      text: "やさしい甘さの果物です。\n初夏に出回り、果肉はやわらかめです。",
      season: "初夏",
      area: "長崎県・千葉県",
      image: "images/loquat.jpg"
    }
  },
  {
    kanji: "梅",
    yomi: "うめ",
    memo: {
      text: "強い酸味と香りが特徴です。\n梅干しや梅酒など、加工して親しまれます。",
      season: "初夏",
      area: "和歌山県",
      image: "images/plum.jpg"
    }
  },
  {
    kanji: "李",
    yomi: "すもも",
    memo: {
      text: "さっぱりした甘ずっぱさの果物です。\n英語ではプラムと呼ばれます。",
      season: "夏",
      area: "山梨県",
      image: "images/sumomo.jpg"
    }
  },
  {
    kanji: "甜瓜",
    yomi: "めろん",
    memo: {
      text: "甘い香りが強い果物です。\n網目のある品種は、香りの良さで人気です。",
      season: "夏",
      area: "北海道・茨城県",
      image: "images/melon.jpg"
    }
  },
  {
    kanji: "鳳梨",
    yomi: "ぱいなっぷる",
    memo: {
      text: "外側がとげとげした南国の果物です。\n缶詰でも親しまれ、甘い香りが特徴です。",
      season: "一年中",
      area: "沖縄県・フィリピン",
      image: "images/pineapple.jpg"
    }
  },

  {
    kanji: "芒果",
    yomi: "まんごー",
    memo: {
      text: "とろっとした甘さが魅力の果物です。\n国産は宮崎県などが有名で、香りも豊かです。",
      season: "夏",
      area: "宮崎県・沖縄県",
      image: "images/mango.jpg"
    }
  },
  {
    kanji: "獼猴桃",
    yomi: "きうい",
    memo: {
      text: "中が緑色で種が黒い果物です。\nビタミンCが多いことで知られます。",
      season: "秋〜冬",
      area: "愛媛県・ニュージーランド",
      image: "images/kiwi.jpg"
    }
  },
  {
    kanji: "柚子",
    yomi: "ゆず",
    memo: {
      text: "香りを楽しむ柑橘です。\n料理の風味づけや、冬至のゆず湯でも有名です。",
      season: "冬",
      area: "高知県",
      image: "images/yuzu.jpg"
    }
  },
  {
    kanji: "椪柑",
    yomi: "ぽんかん",
    memo: {
      text: "皮がむきやすい甘い柑橘です。\n冬に旬をむかえ、さっぱりした甘さが特徴です。",
      season: "冬",
      area: "愛媛県・熊本県",
      image: "images/ponkan.jpg"
    }
  },
  {
    kanji: "洋梨",
    yomi: "ようなし",
    memo: {
      text: "とろける食感が特徴の果物です。\n熟すと香りが強くなり、食べごろがわかりやすいです。",
      season: "秋",
      area: "山形県",
      image: "images/you_nashi.jpg"
    }
  },
  {
    kanji: "藍莓",
    yomi: "ぶるーべりー",
    memo: {
      text: "小さな青い果物です。\nヨーグルトやお菓子に合い、目に良いイメージで有名です。",
      season: "夏",
      area: "長野県",
      image: "images/blueberry.jpg"
    }
  },
  {
    kanji: "葡萄柚",
    yomi: "ぐれーぷふるーつ",
    memo: {
      text: "大きな柑橘で、少し苦みがあります。\n果汁が多く、朝のジュースにもよく使われます。",
      season: "冬〜春",
      area: "アメリカ・南アフリカ",
      image: "images/grapefruit.jpg"
    }
  },
  {
    kanji: "橙",
    yomi: "だいだい",
    memo: {
      text: "お正月飾りにも使われる柑橘です。\n「代々」につながる縁起物として親しまれます。",
      season: "冬",
      area: "和歌山県",
      image: "images/daidai.jpg"
    }
  },
  {
    kanji: "清見",
    yomi: "きよみ",
    memo: {
      text: "みかん系の香りのよい柑橘です。\n果汁が多く、甘みと酸味のバランスが良いです。",
      season: "春",
      area: "愛媛県",
      image: "images/kiyomi.jpg"
    }
  },
  {
    kanji: "次郎柿",
    yomi: "じろうがき",
    memo: {
      text: "形がよく大きめの柿として知られます。\n歯ごたえがあり、甘みがしっかりしています。",
      season: "秋",
      area: "静岡県",
      image: "images/jirogaki.jpg"
    }
  }
];
