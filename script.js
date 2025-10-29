// 调性名称（1-13）
const toneNames = [
    null, "磁性的", "月亮的", "电力的", "自我存在的", "超频的",
    "韵律的", "共振的", "银河的", "太阳的", "行星的",
    "光谱的", "水晶的", "宇宙的"
];

// 图腾名称（1-20）
const totemNames = [
    null, "红龙", "白风", "蓝夜", "黄种子", "红蛇",
    "白世界桥", "蓝手", "黄星星", "红月", "白狗",
    "蓝猴", "黄人", "红天行者", "白巫师", "蓝鹰",
    "黄战士", "红地球", "白镜子", "蓝风暴", "黄太阳"
];

// PSI 数据已通过 psi_data.js 加载
// 矩阵数据已通过 matrices_data.js 加载

// 存储Kin解释的对象 - 直接从main.py复制而来
const kinDescriptions = {
    1: "有意识的聚焦创造，新事物将从你手中诞生并得到滋养。",
    2: "你需要平衡你的表达，轻快风趣不用力地沟通，是个不错的建议。",
    3: "信任你的内在感觉，用你的感觉服务世界。",
    4: "扎根内在，借助所有外力来滋养自己。",
    5: "趁热打铁，有想法立即行动，你可以快速将他们彰显出来。",
    6: "在你内外世界之间建起桥梁，并平衡串联一切。",
    7: "治疗想太多最好的办法就是着手去做，当你动起手来了，你能为周围一切带来疗愈。",
    8: "信任当下呈现的一切都是你的内在美，并将它活出来。",
    9: "清晰你此刻的意图，运用喜悦的能量，你能感染一切。",
    10: "照顾好自己内在所有感受，你所要的一切物质都会被你显化。",
    11: "释放你内在的枷锁，大胆玩起来吧，你本是灵动，富有创造力的。",
    12: "尊重自己与全人类的自由意志，为自己选择负起百分百责任。",
    13: "你不受时间、空间以及身份约束，你拥有无限的可能。",
    14: "闭上眼好好享受当下，你能为自己吸引来新事物。",
    15: "当你看不清路的时候，请你换个身份来拔高你的格局。",
    16: "你在服务他人过程中，获得经验。",
    17: "你所要的一切，都在你的中心。当你为自己而转的时候，所有一切都被你吸引而来。",
    18: "将你的注意力聚集在你真正想做的事情上面，你可以快速显化出一些超赞的灵感。",
    19: "保持内在的平静，你的世界将快速进阶蜕变，而显得越来越好。",
    20: "当你由内而外的散发你的光芒，全世界都被你点亮。",
    21: "相信未知的力量，它将时刻引导你。",
    22: "清晰你想表达的，因为它们都在为了会快速成真。",
    23: "此刻你有着将梦想快速成真的力量。",
    24: "当你不断的释放旧壳，更新版本的你，就能从中成长出来。",
    25: "将你的热情融到你的合作之中，这一切会变得富有生命力。",
    26: "此刻你链接着天地万物、次元空间以及意识维度，机遇、人脉通通为你敞开。",
    27: "你在创造中吸引一切同频人事物。",
    28: "在瑕疵中翻转念头，你将体验更多的美好。",
    29: "你喜悦的能量，可以为周围的一切注入新鲜活力。",
    30: "爱自己并信任自己是安全的，你时时刻刻是被宇宙爱和看顾的。",
    31: "允许自己打破框架，你会有很多新鲜好玩的灵感和念头涌现。",
    32: "平衡好自己与他人的观念，不要被说服，也不要去说服他人。",
    33: "去探索更多的可能性，你将协助更多人打破设限。",
    34: "信任自己可以掌控时间，享受当下唯一一件事情，其他的一切都会为你定格。",
    35: "当你很清楚的知道自己想要找到什么，你就能找到。",
    36: "迈开脚步去实践与执行，你能将想法开花结果。",
    37: "你在不断地释放过去身份的同时，将走在正确的道路上。",
    38: "你看到的一切都是内心的投射，与你自己和解，就能与人达成合作。",
    39: "将你过往所有老旧的信念连根摧毁，保持空性宇宙将赐予你新的礼物。",
    40: "用你温暖的力量，来吸引和创造一切。",
    41: "此刻转一个念，去相信未知的力量，你将开创新能力。",
    42: "像风一般服务世界，你将为周围的环境带来新鲜空气。",
    43: "内在的稳定，会为你带来源源不断的丰盛与富足。",
    44: "许多梦想种子，将即刻显化。",
    45: "用你内在的生命源动力去点燃自己和他人。",
    46: "保持通透，你将为世界带来源源不断的资源。",
    47: "相信自己拥有无限的创造力，然后去为你的目标与梦想做一件事小事吧。",
    48: "在这个当下，请在内在清晰自己，由内而外地去闪亮你自己。",
    49: "你的热忱会为你显化一切物质。",
    50: "释放所有的面具，做真实的你自己。",
    51: "融入大家最好的方式，就是和他们玩在一起。",
    52: "你除了你的所有身份，你还是你自己。",
    53: "扩张你的意识层级，所有一切可能性都将被你吸引而来。",
    54: "从时间紧迫感中解脱出来，享受当下，你将心想事成。",
    55: "你的视野和格局，将为你和他人带来最好的服务。",
    56: "你的勇气将为你带来真正的稳定。",
    57: "由内而外的彰显你自己，你将成为自己生活的中心。",
    58: "平衡你所看到的好与坏，学会接纳一切。",
    59: "当你处变不惊的时候，周围的一切都开始加速蜕变。",
    60: "你需要相信，你值得拥有一切。",
    61: "清晰你的意图，你会收到更多的指引。",
    62: "注意你的言语，它将在实相世界中显化你所说的一切。",
    63: "尊重你的感受，并释放你内在的灵感。",
    64: "向着能够协助你成长内在的方向生长，并拉着大家一起成长。",
    65: "遵循你心中的渴望而行动，你将爆发最大的能量。",
    66: "当你有意识的去链接，所有的人脉、资源、机遇会随之而来。",
    67: "疗愈焦虑的最好方法，就是立马行动。",
    68: "由内而外的点亮自己，用你的热情去服务，周遭会因你而充满活力。",
    69: "当你内在稳定的时候，你的正向能量能更多的感染他人。",
    70: "当你照顾好自己所有感受之后，用你的所有能量可以给他人带来最好的服务。",
    71: "用娱乐的态度，平衡你的精神和物质世界。",
    72: "当你清醒的时候，周围的所有人都将清醒。",
    73: "相信你有无限的可能性。",
    74: "当你明白你清晰的意图并享受当下，便可心享事成。",
    75: "你拥有行动即可显化的能力，拔高你的格局你将显化更大的东西。",
    76: "释放所有的疑惑，像战士一样勇敢前行。",
    77: "知道自己要去哪儿，所有一切被你吸引，所有一切被你融合。",
    78: "人世间的一切都会被你看见，你需要借此来内省和内醒。",
    79: "当你有意识的迎接变化，所有一切都会快速的朝着正向的去发展。",
    80: "当你承认自己拥有软弱一面，你就会变得更加的刚强有力量。",
    81: "遵循你的直觉，它指导你如何注入生命力。",
    82: "当你内在信任自己是安全而被理解的，你就能更多展示你风趣幽默一样。",
    83: "将你精神世界的灵感呈现给现实世界的人们，他们因会你的想法而惊叹。",
    84: "试着组织大家一起成长，你会获得更多滋养。",
    85: "追逐你心中的渴望，你将为你自己和周遭一切带来生命力。",
    86: "你需要相信，会有更棒的礼物来到你的生命中。",
    87: "带着清晰的意图去行动，你能创造一切。",
    88: "由内而外的闪亮自己，当下就是最好的显化。",
    89: "不断更新和蜕变，你将获取更大的能量。",
    90: "先学会爱自己，然后再将你的爱扩散出去。",
    91: "世间一切皆为幻想，你可以做一个孩子头，放开手脚将喜悦能量带给大家。",
    92: "有意识的去做一个观察者，你能从现有的身份局限中解脱。",
    93: "平衡你的深度和广度，去探索更多可能性的同时，别忘了清空所有的认知。",
    94: "当你想为他们提供服务的时候，更多的专注在你的当下，你能为大家带来更多的活力。",
    95: "打破过往的定义，从更高的角度来看待眼前的一切。",
    96: "有了想法，无惧前行，你能获得更多的能力。",
    97: "团结一切可以团结的力量，组织平衡好一切可以平衡的资源。",
    98: "周围的一切，都会随着你的内心而发生改变。",
    99: "请相信眼前一切的变化，都是为了让你变得更好。",
    100: "清晰自己的定位，你将获得匹配的能量。",
    101: "相信未知的力量，你能够创造出新鲜的事物。",
    102: "释放和清空你所有的认知，会有更多的灵性讯息，从你这儿而传播开来。",
    103: "你拥有许多内在的灵感，可以将它们投入与他人的合作之中，会促进你与他人的融合。",
    104: "你的梦想正在快速开花结果，继续保持信心和耐心。",
    105: "当你有了目标，你就有了生命力。",
    106: "所有离开你的，在你放手的那一刻，都会有更高版本的回归。",
    107: "你在参与行动中获得活力，并将活力传给身边人。",
    108: "内在稳定，会让你由内而外发光如星。",
    109: "保持正向，你的所有情绪，将快速感染所有人。",
    110: "照顾好自己的感受，然后去平衡组织更多人学会爱自己。",
    111: "解放自己回归天性，你将影响更多的人开心快乐做自己。",
    112: "相信自己的自由意志，由自己来掌握人生的选择权。",
    113: "清晰你的意图，你将探索到更多的可能性。",
    114: "享受当下，你将快速显化一切你所需物质。",
    115: "释放你过去的认知，重新拔高格局，你能看得更远。",
    116: "你在实践和体验中学会如何与他人合作。",
    117: "去存在而非去成为，整个宇宙都在为你服务。",
    118: "将意识聚焦在你的内在并进行调频，你当下的频率，将会投射于你所处的环境之中。",
    119: "所有一切颠覆你的，都将让你变得更加强大。",
    120: "用你的阳光先温暖自己，当你足够有能量的时候，你自然能够释放出更多的光芒给到他人。",
    121: "在未知之中你依然是绝对的安全，请跟随直觉去创造。",
    122: "想要说话或者分享，就让它发生吧，会有很多讯息在你沟通和分享中流动出来。",
    123: "平衡你的精神世界与物质世界，它们对于你来说一样精彩。",
    124: "滋养自己的内在让内在成长，当你成长了，你周围的一切都会成长。",
    125: "当你非常坚定自己可以拿下目标，并立刻行动，你将拥有巨大的爆发力去实现它。有时候没有能量，问问自己，我清晰我的知道自己要干嘛了吗？",
    126: "你非常明白放下就会回流之时，你释放束缚自己的一切，会有更高版本的东西进入你的生命中。",
    127: "知道自己要创造什么，然后去创造，你便可创造任何一切（如金钱、物质）。",
    128: "释放所有的束缚，便可由内而外的去呈现你的内在美。",
    129: "将你的正向情感，融入与他人的链接之中，这会让一切关系更加融洽。",
    130: "活出无条件的爱最佳途径是，先活出圆满的自己，然后在服务他人。",
    131: "当你把所有的一切设定成游戏，并无拘束的大胆玩耍起来，你将轻松而富有创造力的搞定一切。",
    132: "尊重自己自由意志的同时，别忘了打破所有自己设限的框架。",
    133: "你在不断探索更多可能性之中充满活力。",
    134: "你越专注享受当下，你的内在越稳定且安全。",
    135: "拔高你的格局看事情，你会收到更多的灵感和启发。",
    136: "你会在实践之中，学会如何平衡周围一切。",
    137: "当你回归你自己的中心，你周围的一切都会回到正确的轨道上。",
    138: "你需要相信，改变你的内心，周围一切自然随之改变。",
    139: "当你清晰的了解到自己需要的是什么，周围的一切会配合你快速的颠覆更新为你需要的环境。",
    140: "给予自己足够的能量和关怀，你就能为自己快速显化一切物质。",
    141: "释放内心所有的怀疑，你拥有无限的潜能去创造你未曾有过的体验。",
    142: "当你允许内在随性传播与表达时，你能为周遭创造更多的和谐。",
    143: "你的内在有你所需的一切，感受富足时，你会经历富足。",
    144: "为自己种下梦想，用你的耐心和信心去滋养它们成长。",
    145: "时刻树立的目标和猎物，这将让你保持生命力。",
    146: "有意识的让一切人事物流动起来，你会感觉自己充满活力。",
    147: "你远比你认为的更棒，你的创造能力和你的内心世界一样丰富，用你的智慧重新定义你和你的世界，然后把你的定义活出来。",
    148: "无需寻求认可，从你的内在去绽放你自己的时候，自然会获得掌声。",
    149: "允许情绪的流动和发生，你便可回归平静。",
    150: "你能给予周围的人最好的爱，就是先爱好你自己。",
    151: "相信你的内在有无限的创造力，然后大胆去玩出你自己。",
    152: "将意识回归你自己，保持你清晰的意图，守护你当下的自由意志。",
    153: "允许有更多的可能性发生，因为凡是你内在允许的可能性，你都能显化它们。",
    154: "释放所有的时间束缚，松开时间的绳索，活在当下你将更容易心想事成。",
    155: "拔高你的格局和视野，来看到你与他人自己的合作关系。",
    156: "像战士一样无惧前行，你将在实践和体验中获取能量。",
    157: "搞清楚自己的目的，你便可吸引来一切有利你的资源。",
    158: "接纳所有面相的你自己，周围一切都将变得美好。",
    159: "稳住你的内心，随时追随变化和蜕变，它们会为你和身边一切带来新鲜的生命活力。",
    160: "提升你的配得感，将自己定位定的更高一些，你会发现你能够给出去的能量更多了，而且你的内在也会更加的稳定。",
    161: "遵循内在的直觉指引去创造，会有新事物因你而诞生。",
    162: "去平衡你的表达，将你内心的一切，透过你的表达扩散出去。",
    163: "尊重你的内在感受，它们会快速的投射在你的现实生活之中。",
    164: "对于你的目标和梦想，你需要保持耐心，相信它们都会破土而出，用你的信心和正面态度去滋养他们。",
    165: "当你非常清晰自己想要捕捉什么猎物的时候，你自然就会有很强大的爆发力去完成它。有时候没有能量，问问自己，我清晰我的知道自己要干嘛了吗？",
    166: "有意识去做链接，你会接引来特别多的人事物，进入到你的生命之中。",
    167: "释放所有的顾虑，直接去行动和创造，你将获得力量和指引。",
    168: "放下对自己与他人的评判，允许自己和他人由内而外大放异彩，它能协助你与更多人融洽相处。",
    169: "善用你的正向情绪能量，将它融入于你的言行之中，可以为他人充电甚至疗愈。",
    170: "服务他人之前，请先照顾好自己所有感受。",
    171: "唯一限制你的是你自己，当你更大胆的去活出自己，你将富有创造力。",
    172: "将意念回归于你自己，你将为自己和他人带来更多的活力。",
    173: "请你记得，你是穿梭时空的预言家、探索家，你有能力放下自我禁锢，一切为你打开。",
    174: "享受当下，你的想法能够快速成真。",
    175: "平衡你的现在和未来，拔高格局同时，别忘了脚踏实地从当下出发。",
    176: "当你回归你的中心，像一个战士无惧前行，身边所有的人事物都会处于他们正确的位置上。",
    177: "你需要相信，你正走在正确的道路上，所有你需要的资源也都会被你吸引而来。",
    178: "当你有意识的去内省，你能快速的转变你的环境。",
    179: "你会在颠覆和变化之中，显化你需要的一切物质。",
    180: "释放掉那些令你窒息的责任，将你的能量放在更有意义的事情，你能输出更大的价值。",
    181: "放下内在评判，信任你的直觉去创造新事物，并与这个他人达成融合。",
    182: "保持轻快风趣的状态，你的轻松自在会创造更多轻松自在。",
    183: "尊重你的感受，它会为你吸引来一切。",
    184: "对自己的梦想和愿景保持耐心，它们在你看不见的土里持续生长着。",
    185: "遵循内在的渴望行动，它能为你和他人带来活力。",
    186: "保持通透允许人事物的流动和变化，你的生活会被照顾的更好。",
    187: "开始着手行动，你会获取更多的灵感。",
    188: "你需要平衡内在和外在的美，追求细节的同时，别忘了注重整体进度。",
    189: "当你内在平静的时候，你周围的一切也都因你的平静而净化。",
    190: "你需要相信，当你学会爱自己之后，你将更有能力去爱身边的人。",
    191: "当你清楚明白眼前的一切都是幻相，然后放开手脚大胆去玩去创造，你反而可以很轻松的搞定一切。",
    192: "将意识回归自己，为自己的选择负起百分百的责任，你能为自己创造显化一切物质需求。",
    193: "释放掉所有的设限，大胆去相信并探索更多的可能性。",
    194: "你越享受当下，你能促进周围一切和谐。",
    195: "站在未来去展望未来，凡是你能看到的未来，都是你可以到达的未来。",
    196: "你会在实践和体验之中，吸引和创造一切。",
    197: "你不需要替别人操心，当你正位了，周围的人也会跟着一起正位。",
    198: "你会在不断自我内省修正过程中，获取更多的活力。",
    199: "信任自己是安全的，并学会臣服，周围一切的发生最终都会让你的生活变得更好。",
    200: "由内而外彰显自己，你像太阳一般温暖而有能量。",
    201: "当你的内心越笃定，外在的质疑你的人越少。",
    202: "保持正向表达，它会改变你周遭的环境。",
    203: "学会相信你的内在感受，并遵从感觉办事。",
    204: "保持你的意图清晰，因为你在哪儿播种，你在哪儿开花结果。",
    205: "有了想法就立马行动，你能快速显化你所需的一切物质。",
    206: "释放所有束缚你的人事物，保持敞开会有更多的资源进入你的生命中。",
    207: "在参与行动之中，你将越来越懂得如何将一切变得更融洽。",
    208: "活出多彩的你自己，许多人会因你而受到启发。",
    209: "运用你的正向情绪能量，将为你吸引和创造一切所需。",
    210: "当你学会接纳所有的自己并爱上自己，周围的人便可给予你更多的爱和理解。",
    211: "你能为自己和他人提供最佳的服务，就是放开手脚开心快乐的去玩耍。",
    212: "请打破对于你自己所有的定义，因为你拥有无限的可能。",
    213: "探索更多的可能性，你将快速获取更多的灵感。",
    214: "你需要在线性时间与你内在感受时间之中取得平衡。",
    215: "拔高你的格局，用更高的角度去看待一切，你会发现一切都开始有所不同。",
    216: "你需要相信真正的真理是经得起你的实践，然后无惧前行。",
    217: "当你清楚的知道自己去哪儿，全世界都会为你让路。",
    218: "当你聚焦在某件事情上的时候，你能快速将它显化。",
    219: "释放所有外在的依靠，放手信任宇宙，你将回到最正确的位置上。",
    220: "你的光芒和爱将包融一切。",
    221: "你具有在未知之中，无限的创造力，请遵循你的内在指引。",
    222: "当你有意识的去表达，会有很多新讯息从你身上传递出来。",
    223: "当你感到疲惫的时候，不妨让自己安静的独处来充充电。",
    224: "不断地去吸收正向的频率，能为你带来生命活力。",
    225: "信任自己是安全的，然后大胆的去遵循渴望行动，你将获得更多的能量。",
    226: "你链接的人事物越多，你越能从内在去彰显你自己。",
    227: "你能快速适应环境，并有双倍的创造力、完成力、疗愈力，开启的秘钥原本就在你心中，只需闭眼询问自己的内心，即可拿回。",
    228: "当你由内而外的活出自己，你能点亮周围的一切。",
    229: "相信你的情绪能量能够感染一切，并将它实践于你的生活之中，你便掌握了这个世界的情绪遥控器。",
    230: "当你很清楚的明白在爱别人之前，先学会让自己圆满，你便获掌握了无条件的爱。",
    231: "此刻只管尽情的玩耍，所有的物质会为了匹配你的兴奋而显化。",
    232: "释放头脑所有的设限，你需要清除的明白，你拥有无限可能性。",
    233: "透过你的探索以及相信这个世界是有更多的可能性，你将协助更多的人提升意识层级。",
    234: "当你完全的沉浸于你的当下，你将掌握心享事成的魔法。",
    235: "你现在的格局，会为你开启新的世界。",
    236: "你有能力从所有二元对立中穿越跳脱，你的智慧让你无所畏惧，勇于开拓。",
    237: "当你处于轨道上的时候，你周围的一切都会充满活力。", 
    238: "你可以透过观察周围的一切，快速来觉知和内醒自己，从而打破自我限制。",
    239: "你的想法正在以颠覆的形式，在你生活中快速成真。",
    240: "你需要平衡你的奉献与接收，你可以无条件的付出，你也需要全然的敞开接收。",
    241: "相信你的内在指引，在未知中去创造新事物，你将引领更多的人成为新世界的开拓者。",
    242: "你需要对你所表达的一切保持信任，然后大胆的去表达，当下一切本就是最好的安排。",
    243: "你的内在本就具足，当你越清晰自己需求时，你就越能获得你要的一切。",
    244: "保持正向从外界吸收更多的营养，关注内在的成长，你能显化一切所需物质。",
    245: "释放所有束缚你的一切，并立刻采取行动，这会让你持续保持能量。",
    246: "保持自身的通透，去链接更多的人事物，你能将更多的能量融合起来。",
    247: "当你开始运用你的双手行动起来，你便可创造一切和疗愈一切。",
    248: "活出多彩的自己，你会像启明星一般吸引人注意力。",
    249: "允许所有的情绪流动，你就能净化自己的能量。",
    250: "服务别人之前，请先服务好自己。",
    251: "当你玩到开心了，你的环境自然就会处于稳定状态。",
    252: "你不需要透过别人的认可来定义你自己，因为你本就充满无限可能。",
    253: "你需要平衡自己广度和深度上的探索，因为它们一样会为你带来更多可能性。",
    254: "当你越享受当下，周围的一切越不会对你进行干扰。",
    255: "你需要相信，你所有展望的未来，都是你可以到达的未来。",
    256: "当你意图清晰的时候，你只要无惧前行，便可到达。",
    257: "当你坚定自己的方向并开始行动时，你能快速显化一切所需物质。",
    258: "释放掉内在对自己所有的评判，你会发现周围一切环境都变得更加和谐。",
    259: "所有的颠覆，都是为了更好的融合。",
    260: "你的能量包罗万象，但你需要清晰知道自己是谁。"
};

// 存储调性和图腾映射到Kin的对象
let kinMap = {};

// 阳历出生年对应数字（1858-2117）
const yearNums = {
    1858:62,1859:167,1860:12,1861:117,1862:222,1863:67,1864:172,1865:17,1866:122,1867:227,
    1868:72,1869:177,1870:22,1871:127,1872:232,1873:77,1874:182,1875:27,1876:132,1877:237,
    1878:82,1879:187,1880:32,1881:137,1882:242,1883:87,1884:192,1885:37,1886:142,1887:247,
    1888:92,1889:197,1890:42,1891:147,1892:252,1893:97,1894:202,1895:47,1896:152,1897:257,
    1898:102,1899:207,1900:52,1901:157,1902:2,1903:107,1904:212,1905:57,1906:162,1907:7,
    1908:112,1909:217,
    1910:62,1911:167,1912:12,1913:117,1914:222,1915:67,1916:172,1917:17,1918:122,1919:227,
    1920:72,1921:177,1922:22,1923:127,1924:232,1925:77,1926:182,1927:27,1928:132,1929:237,
    1930:82,1931:187,1932:32,1933:137,1934:242,1935:87,1936:192,1937:37,1938:142,1939:247,
    1940:92,1941:197,1942:42,1943:147,1944:252,1945:97,1946:202,1947:47,1948:152,1949:257,
    1950:102,1951:207,1952:52,1953:157,1954:2,1955:107,1956:212,1957:57,1958:162,1959:7,
    1960:112,1961:217,
    1962:62,1963:167,1964:12,1965:117,1966:222,1967:67,1968:172,1969:17,1970:122,1971:227,
    1972:72,1973:177,1974:22,1975:127,1976:232,1977:77,1978:182,1979:27,1980:132,1981:237,
    1982:82,1983:187,1984:32,1985:137,1986:242,1987:87,1988:192,1989:37,1990:142,1991:247,
    1992:92,1993:197,1994:42,1995:147,1996:252,1997:97,1998:202,1999:47,2000:152,2001:257,
    2002:102,2003:207,2004:52,2005:157,2006:2,2007:107,2008:212,2009:57,2010:162,2011:7,
    2012:112,2013:217,
    2014:62,2015:167,2016:12,2017:117,2018:222,2019:67,2020:172,2021:17,2022:122,2023:227,
    2024:72,2025:177,2026:22,2027:127,2028:232,2029:77,2030:182,2031:27,2032:132,2033:237,
    2034:82,2035:187,2036:32,2037:137,2038:242,2039:87,2040:192,2041:37,2042:142,2043:247,
    2044:92,2045:197,2046:42,2047:147,2048:252,2049:97,2050:202,2051:47,2052:152,2053:257,
    2054:102,2055:207,2056:52,2057:157,2058:2,2059:107,2060:212,2061:57,2062:162,2063:7,
    2064:112,2065:217,
    2066:62,2067:167,2068:12,2069:117,2070:222,2071:67,2072:172,2073:17,2074:122,2075:227,
    2076:72,2077:177,2078:22,2079:127,2080:232,2081:77,2082:182,2083:27,2084:132,2085:237,
    2086:82,2087:187,2088:32,2089:137,2090:242,2091:87,2092:192,2093:37,2094:142,2095:247,
    2096:92,2097:197,2098:42,2099:147,2100:252,2101:97,2102:202,2103:47,2104:152,2105:257,
    2106:102,2107:207,2108:52,2109:157,2110:2,2111:107,2112:212,2113:57,2114:162,2115:7,
    2116:112,2117:217
};

// 月份对应数
const monthNums = {
    1:0, 2:31, 3:59, 4:90, 5:120, 6:151,
    7:181, 8:212, 9:243, 10:13, 11:44, 12:74
};

// 图腾色彩映射
const totemColors = {
    "红龙": "red", "红蛇": "red", "红月": "red", "红天行者": "red", "红地球": "red",
    "白风": "white", "白世界桥": "white", "白狗": "white", "白巫师": "white", "白镜子": "white",
    "蓝夜": "blue", "蓝手": "blue", "蓝猴": "blue", "蓝鹰": "blue", "蓝风暴": "blue",
    "黄种子": "yellow", "黄星星": "yellow", "黄人": "yellow", "黄战士": "yellow", "黄太阳": "yellow"
};

// 加载Kin调性和图腾映射
function loadKinDescriptions() {
    // 创建Kin调性和图腾的映射
    for (let kin = 1; kin <= 260; kin++) {
        // 获取调性和图腾
        const tone = ((kin - 1) % 13) + 1;
        const seal = ((kin - 1) % 20) + 1;
        
        // 存储调性和图腾对应的Kin值
        if (!kinMap[tone]) kinMap[tone] = {};
        kinMap[tone][seal] = kin;
    }
    
    console.log('Kin数据加载完成');
}

// 根据调性和图腾查找对应的Kin值
function findKinByToneSeal(tone, seal) {
    // 从kinMap中查找，如果存在则返回对应值
    if (kinMap[tone] && kinMap[tone][seal]) {
        return kinMap[tone][seal];
    }
    // 否则根据公式计算
    let kin = ((tone - 1) + (seal - 1) * 13 + 1);
    if (kin > 260) {
        kin = kin % 260;
        if (kin === 0) kin = 260;
    }
    return kin;
}

// 计算公历日期对应的玛雅 Kin (卓尔金历)
function gregorianToKin(year, month, day) {
    // 查年份对应数（52年循环）
    let y = year;
    while (y > 2117) {
        y -= 52;
    }
    while (y < 1858) {
        y += 52;
    }
    
    const yearVal = yearNums[y];
    let S = yearVal + monthNums[month] + day;
    S %= 260;
    if (S === 0) {
        S = 260;
    }
    return S;
}

// 根据 Kin 值获取调性和图腾编号
function kinToToneSeal(kin) {
    const tone = ((kin - 1) % 13) + 1;
    const seal = ((kin - 1) % 20) + 1;
    return { tone, seal };
}

// 计算玛雅天赋印记
function calculateMayaTraits(year, month, day) {
    const kinMain = gregorianToKin(year, month, day);
    const { tone: toneMain, seal: sealMain } = kinToToneSeal(kinMain);
    
    // 计算五大天赋图腾
    // 挑战图腾 = 主图腾+10或者-10
    const sealChallenge = (sealMain + 10 - 1) % 20 + 1;
    // 支持图腾 = 19 - 主图腾
    const sealSupport = (19 - sealMain + 20 ) % 20 || 20;
    
    // 推动图腾 = 21 - 主图腾
    const sealPush = (21 - sealMain - 1) % 20 + 1;
    
    // 指引图腾
    let sealGuide;
    if ([1,6,11].includes(toneMain)) {
        sealGuide = sealMain;
    } else if ([2,7,12].includes(toneMain)) {
        sealGuide = (sealMain + 12 - 1) % 20 + 1;
    } else if ([3,8,13].includes(toneMain)) {
        sealGuide = (sealMain + 4 - 1) % 20 + 1;
    } else if ([4,9].includes(toneMain)) {
        sealGuide = (sealMain + 16 - 1) % 20 + 1;
    } else {
        sealGuide = (sealMain + 8 - 1) % 20 + 1;
    }
    
    // 计算调性
    // 主图腾、挑战图腾、支持图腾、指引图腾的调性一致
    const toneChallenge = toneMain;
    const toneSupport = toneMain;
    const toneGuide = toneMain;
    // 推动图腾的调性 = 14-主图腾调性
    const tonePush = 14 - toneMain || 13;
    
    // 计算各个图腾的kin值
    const kinGuide = findKinByToneSeal(toneGuide, sealGuide);
    const kinChallenge = findKinByToneSeal(toneChallenge, sealChallenge);
    const kinSupport = findKinByToneSeal(toneSupport, sealSupport);
    const kinPush = findKinByToneSeal(tonePush, sealPush);
    
    // 波符
    const waveNum = Math.floor((kinMain - 1) / 13) + 1;
    const waveDay = toneMain;  // 第几天就是调性数
    const firstDayKin = (waveNum - 1) * 13 + 1;
    const waveSeal = ((firstDayKin - 1) % 20) + 1;
    
    // 内在女神
    // 计算调性：主图腾调性x3+1，大于13就一直减13
    let toneGoddess = toneMain * 3 + 1;
    while (toneGoddess > 13) {
        toneGoddess -= 13;
    }
    
    // 计算图腾：指引图腾的挑战图腾
    const sealGoddess = (sealGuide + 10 - 1) % 20 + 1;
    
    // 计算内在女神的Kin值
    const kinGoddess = findKinByToneSeal(toneGoddess, sealGoddess);
    
    // 返回计算结果
    return {
        main: {
            kin: kinMain, 
            tone: toneMain, 
            toneName: toneNames[toneMain], 
            seal: sealMain, 
            sealName: totemNames[sealMain],
            description: kinDescriptions[kinMain] || ''
        },
        guide: {
            kin: kinGuide,
            tone: toneGuide, 
            toneName: toneNames[toneGuide], 
            seal: sealGuide, 
            sealName: totemNames[sealGuide]
        },
        support: {
            kin: kinSupport,
            tone: toneSupport, 
            toneName: toneNames[toneSupport], 
            seal: sealSupport, 
            sealName: totemNames[sealSupport]
        },
        challenge: {
            kin: kinChallenge,
            tone: toneChallenge, 
            toneName: toneNames[toneChallenge], 
            seal: sealChallenge, 
            sealName: totemNames[sealChallenge]
        },
        push: {
            kin: kinPush,
            tone: tonePush, 
            toneName: toneNames[tonePush], 
            seal: sealPush, 
            sealName: totemNames[sealPush]
        },
        wave: {
            waveNum: waveNum,
            waveDay: waveDay,
            seal: waveSeal,
            sealName: totemNames[waveSeal]
        },
        goddess: {
            kin: kinGoddess,
            tone: toneGoddess,
            toneName: toneNames[toneGoddess],
            seal: sealGoddess,
            sealName: totemNames[sealGoddess],
            description: kinDescriptions[kinGoddess] || ''
        }
    };
}

// 初始化日期选择器
function initDateSelectors() {
    const yearSelect = document.getElementById("year");
    const monthSelect = document.getElementById("month");
    const daySelect = document.getElementById("day");
    
    // 获取当前日期
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth()返回0-11
    const currentDay = currentDate.getDate();
    
    // 初始化年份选择器 (从1950年到2100年)
    for (let year = 1950; year <= 2100; year++) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        if (year === currentYear) { // 默认选择当前年份
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
    
    // 初始化月份选择器
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        if (month === currentMonth) { // 默认选择当前月份
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }
    
    // 更新日期选择器
    updateDaySelector();
    
    // 设置当前日期
    setTimeout(() => {
        // 使用setTimeout确保日期选择器已更新
        for (let i = 0; i < daySelect.options.length; i++) {
            if (parseInt(daySelect.options[i].value) === currentDay) {
                daySelect.options[i].selected = true;
                break;
            }
        }
    }, 0);
    
    // 当年份或月份改变时，更新日期选择器
    yearSelect.addEventListener("change", updateDaySelector);
    monthSelect.addEventListener("change", updateDaySelector);
}

// 更新日期选择器
function updateDaySelector() {
    const yearSelect = document.getElementById("year");
    const monthSelect = document.getElementById("month");
    const daySelect = document.getElementById("day");
    
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    
    // 保存当前选择的日期
    const selectedDay = daySelect.value ? parseInt(daySelect.value) : 1;
    
    // 计算选定月份的天数
    let daysInMonth;
    if (month === 2) {
        // 闰年2月有29天，平年28天
        daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
        daysInMonth = 30;
    } else {
        daysInMonth = 31;
    }
    
    // 清空现有选项
    daySelect.innerHTML = "";
    
    // 添加新选项
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        // 如果之前选择的日期在当前月份有效，则保持选中
        if (day === Math.min(selectedDay, daysInMonth)) {
            option.selected = true;
        }
        daySelect.appendChild(option);
    }
}

// 初始化页面
document.addEventListener("DOMContentLoaded", function() {
    // 检查seal文件夹图片
    checkSealImages();

    // 加载Kin描述数据
    loadKinDescriptions();

    // 初始化日期选择器
    initDateSelectors();
    
    // 添加计算按钮的点击事件监听
    document.getElementById("calculate").addEventListener("click", function() {
        const year = parseInt(document.getElementById("year").value);
        const month = parseInt(document.getElementById("month").value);
        const day = parseInt(document.getElementById("day").value);
        
        // 计算结果
        const results = calculateMayaTraits(year, month, day);
        
        // 显示结果
        displayResults(results);
        
        // 自动滚动到结果区域
        setTimeout(() => {
            document.getElementById("result").scrollIntoView({
                behavior: 'smooth'
            });
        }, 500);
    });
    
    // 检测设备类型，并添加相应的交互方式
    detectDeviceAndAdjust();
    
    // 初始化底部导航
    initBottomNav();
});

// 初始化底部导航
function initBottomNav() {
    // 获取当前页面URL
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";
    
    // 获取所有导航项
    const navItems = document.querySelectorAll('.nav-item');
    
    // 设置当前页面的导航项为激活状态
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (pageName === href || (pageName === "" && href === "index.html")) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
        
        // 添加点击效果
        item.addEventListener('click', function() {
            // 点击时添加过渡类
            this.classList.add('nav-clicked');
            
            // 页面跳转前移除过渡类
            setTimeout(() => {
                this.classList.remove('nav-clicked');
            }, 300);
        });
    });
    
    // 调整内容区域的底部边距，确保内容不被底部导航遮挡
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        const bottomNavHeight = bottomNav.offsetHeight;
        document.body.style.paddingBottom = (bottomNavHeight + 10) + 'px';
    }
}

// 检测设备类型并调整交互方式
function detectDeviceAndAdjust() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isPortrait = window.innerHeight > window.innerWidth;
    const screenWidth = window.innerWidth;
    
    // 添加基础设备类
    if (isMobile) {
        // 为移动设备优化
        console.log('检测到移动设备，应用移动优化...');
        document.body.classList.add('mobile-device');
        
        // 区分手机和平板
        if (screenWidth < 768) {
            document.body.classList.add('phone-device');
        } else {
            document.body.classList.add('tablet-device');
        }
        
        // 区分横屏和竖屏
        if (isPortrait) {
            document.body.classList.add('portrait-mode');
            document.body.classList.remove('landscape-mode');
        } else {
            document.body.classList.add('landscape-mode');
            document.body.classList.remove('portrait-mode');
        }
        
        // 对触摸设备添加特定的样式
        document.body.classList.add('touch-device');
        
        // 用点击替换悬停效果
        const seals = document.querySelectorAll('.seal');
        seals.forEach(seal => {
            seal.addEventListener('click', function() {
                // 先移除所有活跃状态
                seals.forEach(s => s.classList.remove('active'));
                // 然后添加当前项的活跃状态
                this.classList.add('active');
                
                // 3秒后自动移除活跃状态
                setTimeout(() => {
                    this.classList.remove('active');
                }, 3000);
            });
        });
        
        // 监听屏幕方向变化
        window.addEventListener('orientationchange', function() {
            setTimeout(() => {
                const isPortrait = window.innerHeight > window.innerWidth;
                if (isPortrait) {
                    document.body.classList.add('portrait-mode');
                    document.body.classList.remove('landscape-mode');
                } else {
                    document.body.classList.add('landscape-mode');
                    document.body.classList.remove('portrait-mode');
                }
            }, 300); // 等待一段时间以确保正确获取屏幕尺寸
        });
    } else {
        // 桌面设备优化
        console.log('检测到桌面设备');
        document.body.classList.add('desktop-device');
    }
    
    // 设置图片加载优先级
    optimizeImageLoading();
}

// 优化图片加载
function optimizeImageLoading() {
    // 使用IntersectionObserver延迟加载不在视口的图片
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // 检查页面加载后添加的图片
        function checkForNewImages() {
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // 当显示结果时，设置图片的data-src而不是直接设置src
        window.setOptimizedImageSrc = function(imgId, path) {
            const img = document.getElementById(imgId);
            if (img) {
                img.setAttribute('data-src', path);
                imageObserver.observe(img);
            }
        };
        
        // 定期检查新图片
        setInterval(checkForNewImages, 1000);
    }
}

// 检查seal文件夹图片是否存在
function checkSealImages() {
    const statusElement = document.getElementById('image-status');
    
    // 创建一个测试图片元素
    const testImg = new Image();
    testImg.onload = function() {
        statusElement.textContent = "图片目录检查正常";
        statusElement.className = "status-message success";
        setTimeout(() => {
            statusElement.style.display = "none";
        }, 3000);
    };
    
    testImg.onerror = function() {
        statusElement.innerHTML = `
            <strong>提示：图片目录未找到或图片不存在</strong><br>
            请确保在网站根目录下有一个名为"seal"的文件夹，<br>
            并且该文件夹中包含名为1.png到20.png的图片文件。<br>
            图片路径示例：seal/1.png
        `;
        statusElement.className = "status-message error";
    };
    
    // 尝试加载一个图片
    testImg.src = "seal/1.png";
}

// 显示计算结果
function displayResults(results) {
    // 显示结果区域
    document.getElementById("result").style.display = "block";
    
    // 创建图片加载计数器
    let loadedImages = 0;
    const totalImages = 7; // 更新为7个图片（5个原始图腾 + 波符 + 内在女神）
    const statusElement = document.getElementById('image-status');
    
    statusElement.textContent = "正在加载图片...";
    statusElement.className = "status-message info";
    
    // 图片加载错误处理函数
    function handleImageError(img) {
        console.error(`图片加载失败: ${img.src}`);
        // 设置一个默认图片或显示错误提示
        img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23888'%3E图片未找到%3C/text%3E%3C/svg%3E";
        img.style.border = "1px solid red";
        
        // 更新加载计数
        loadedImages++;
        checkAllImagesLoaded();
    }
    
    // 检查所有图片是否已加载
    function checkAllImagesLoaded() {
        if (loadedImages === totalImages) {
            if (document.querySelectorAll('.seal img[style*="border: 1px solid red"]').length > 0) {
                statusElement.textContent = "部分图片加载失败，请检查seal文件夹";
                statusElement.className = "status-message error";
            } else {
                statusElement.textContent = "所有图片加载成功";
                statusElement.className = "status-message success";
                setTimeout(() => {
                    statusElement.style.display = "none";
                }, 3000);
            }
        }
    }
    
    // 设置图片路径并添加错误处理
    function setImageWithFallback(imgId, sealNumber) {
        const img = document.getElementById(imgId);
        
        // 图片加载成功处理
        img.onload = function() {
            loadedImages++;
            checkAllImagesLoaded();
        };
        
        // 针对移动设备的优化设置
        if (window.setOptimizedImageSrc && 'IntersectionObserver' in window) {
            // 使用优化的图片加载方式
            window.setOptimizedImageSrc(imgId, `seal/${sealNumber}.png`);
            
            // 仍然需要错误处理
            img.onerror = function() {
                this.onerror = null;
                this.src = `./seal/${sealNumber}.png`;
                this.onerror = function() {
                    this.onerror = null;
                    this.src = `../seal/${sealNumber}.png`;
                    this.onerror = function() {
                        handleImageError(this);
                    };
                };
            };
        } else {
            // 传统图片加载方式
            img.src = `seal/${sealNumber}.png`;
            img.onerror = function() {
                this.onerror = null; // 防止循环触发错误
                // 尝试其他路径
                this.src = `./seal/${sealNumber}.png`;
                this.onerror = function() {
                    this.onerror = null;
                    this.src = `../seal/${sealNumber}.png`;
                    this.onerror = function() {
                        handleImageError(this);
                    };
                };
            };
        }
    }
    
    // 主印记
    document.getElementById("main-name").textContent = `主印记·${results.main.toneName}${results.main.sealName}`;
    setImageWithFallback("main-img", results.main.seal);
    document.getElementById("kin-info").textContent = `Kin ${results.main.kin}`;
    
    // 主印记描述
    const kinDescElement = document.getElementById("kin-desc");
    if (results.main.description && results.main.description.trim() !== '') {
        kinDescElement.textContent = results.main.description;
        document.querySelector('.description-section').style.display = 'block';
    } else {
        document.querySelector('.description-section').style.display = 'none';
    }
    
    // 指引位
    document.getElementById("guide-name").textContent = `指引·${results.guide.toneName}${results.guide.sealName}`;
    setImageWithFallback("guide-img", results.guide.seal);
    
    // 添加指引位的Kin信息
    if (!document.getElementById("guide-info")) {
        const guideInfoElement = document.createElement("div");
        guideInfoElement.id = "guide-info";
        guideInfoElement.className = "kin-info";
        document.querySelector(".seal.guide").appendChild(guideInfoElement);
    }
    document.getElementById("guide-info").textContent = `Kin ${results.guide.kin}`;
    
    // 挑战位
    document.getElementById("challenge-name").textContent = `挑战·${results.challenge.toneName}${results.challenge.sealName}`;
    setImageWithFallback("challenge-img", results.challenge.seal);
    
    // 添加挑战位的Kin信息
    if (!document.getElementById("challenge-info")) {
        const challengeInfoElement = document.createElement("div");
        challengeInfoElement.id = "challenge-info";
        challengeInfoElement.className = "kin-info";
        document.querySelector(".seal.challenge").appendChild(challengeInfoElement);
    }
    document.getElementById("challenge-info").textContent = `Kin ${results.challenge.kin}`;
    
    // 支持位
    document.getElementById("support-name").textContent = `支持·${results.support.toneName}${results.support.sealName}`;
    setImageWithFallback("support-img", results.support.seal);
    
    // 添加支持位的Kin信息
    if (!document.getElementById("support-info")) {
        const supportInfoElement = document.createElement("div");
        supportInfoElement.id = "support-info";
        supportInfoElement.className = "kin-info";
        document.querySelector(".seal.support").appendChild(supportInfoElement);
    }
    document.getElementById("support-info").textContent = `Kin ${results.support.kin}`;
    
    // 推动位
    document.getElementById("push-name").textContent = `推动·${results.push.toneName}${results.push.sealName}`;
    setImageWithFallback("push-img", results.push.seal);
    
    // 添加推动位的Kin信息
    if (!document.getElementById("push-info")) {
        const pushInfoElement = document.createElement("div");
        pushInfoElement.id = "push-info";
        pushInfoElement.className = "kin-info";
        document.querySelector(".seal.push").appendChild(pushInfoElement);
    }
    document.getElementById("push-info").textContent = `Kin ${results.push.kin}`;
    
    // 波符
    document.getElementById("wave-name").textContent = `波符·${results.wave.sealName}`;
    document.getElementById("wave-info").textContent = `第${results.wave.waveDay}天`;
    setImageWithFallback("wave-img", results.wave.seal);

    // 内在女神
    document.getElementById("goddess-name").textContent = `内在女神`;
    document.getElementById("goddess-info").textContent = `${results.goddess.toneName}${results.goddess.sealName}`;
    //document.getElementById("goddess-info").textContent = `Kin ${results.goddess.kin}`;
    setImageWithFallback("goddess-img", results.goddess.seal);

    // 获取13月亮历日期、PSI和对等KIN（本地计算）
    const year = parseInt(document.getElementById("year").value);
    const month = parseInt(document.getElementById("month").value);
    const day = parseInt(document.getElementById("day").value);

    try {
        // 获取 13 月亮历信息和 PSI
        const lunar13Info = getLunar13Info(year, month, day);

        // 显示 PSI
        if (lunar13Info && lunar13Info.psi) {
            // 解析 PSI 文本，例如 "磁性的红龙"
            const psiText = lunar13Info.psi;
            const psiMatch = psiText.match(/(.+的)?(.+)/);

            if (psiMatch) {
                const toneName = psiMatch[1] || '';
                const sealName = psiMatch[2] || psiText;

                // 找到对应的图腾编号
                let sealNum = 0;
                for (let i = 1; i <= 20; i++) {
                    if (totemNames[i] === sealName) {
                        sealNum = i;
                        break;
                    }
                }

                document.getElementById("psi-name").textContent = `PSI`;
                document.getElementById("psi-info").textContent = `${toneName}${sealName}`;
                //document.getElementById("psi-info").textContent = lunar13Info.lunarDateShort;
                if (sealNum > 0) {
                    setImageWithFallback("psi-img", sealNum);
                }
            }
        }

        // 计算对等KIN
        const equivalentKinData = calculateEquivalentKin(year, month, day);

        // 显示对等 KIN
        if (equivalentKinData && equivalentKinData.equivalentKin > 0) {
            const equivalentKin = equivalentKinData.equivalentKin;
            const equivalentTone = equivalentKinData.equivalentTone;
            const equivalentSeal = equivalentKinData.equivalentSeal;
            const equivalentToneName = toneNames[equivalentTone];
            const equivalentSealName = totemNames[equivalentSeal];

            document.getElementById("equivalent-name").textContent = `对等Kin:${equivalentKin}`;
            document.getElementById("equivalent-info").textContent = `${equivalentToneName}${equivalentSealName}`;
            //document.getElementById("equivalent-info").textContent = `Kin ${equivalentKin}`;
            setImageWithFallback("equivalent-img", equivalentSeal);
        }
    } catch (error) {
        console.warn('计算PSI或对等KIN失败:', error);
        // 即使失败也不影响主要功能的显示
    }
}