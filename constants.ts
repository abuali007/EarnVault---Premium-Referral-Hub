import { Category, LinkItem } from './types';

// GLOBAL ANALYTICS CONFIGURATION
// We switched to 'api.counterapi.dev' because 'countapi.xyz' is currently down/offline.
export const API_BASE_URL = "https://api.counterapi.dev/v1";
export const COUNTER_NAMESPACE = "earnvault_v2_production"; // Must be unique without spaces

export const HERO_TITLE = "EarnVault";
export const HERO_SUBTITLE = "Your Gateway to Online Wealth. A curated collection of the world's best crypto exchanges, AI tools, and passive income platforms. Verified, safe, and optimized for 2026.";

export const LINKS_DATA: LinkItem[] = [
  // ==========================================
  // TIER 1: THE GIANTS (Essential & High Paying)
  // ==========================================
  {
    id: 'binance',
    name: 'Binance',
    url: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_00VI77NM2Y',
    category: Category.CRYPTO,
    description: 'The world\'s #1 crypto exchange. Best liquidity and P2P trading worldwide.',
    isHot: true
  },
  {
    id: 'wise',
    name: 'Wise',
    url: 'https://wise.com/invite/dic/ahmeda17982',
    category: Category.SHOPPING,
    description: 'The smartest way to send/receive money internationally. Essential for freelancers.',
    isHot: true
  },
  {
    id: 'ysense',
    name: 'YSense',
    url: 'https://www.ysense.com/?rb=149494804',
    category: Category.EARNING,
    description: 'A trusted global earning site. High paying surveys and offers available globally.',
    isHot: true
  },
  {
    id: 'tradingview',
    name: 'TradingView',
    url: 'https://www.tradingview.com/pricing/?share_your_love=IIGreat',
    category: Category.CRYPTO,
    description: 'The standard for charting and technical analysis. A must for every trader.',
    isHot: true
  },
  {
    id: 'airalo',
    name: 'Airalo',
    url: 'https://ref.airalo.com/A1488',
    category: Category.SHOPPING,
    description: 'Instant eSIM data packs for global travel. Save huge on roaming charges.',
    code: 'A1488',
    isHot: true
  },
  {
    id: 'trezor',
    name: 'Trezor',
    url: 'http://trezorio.refr.cc/default/u/ahmedalzahrani',
    category: Category.SHOPPING,
    description: 'The original hardware wallet. The safest way to store your crypto assets.',
    isHot: true
  },

  // ==========================================
  // TIER 2: TOP PERFORMERS (High Reliability)
  // ==========================================
  {
    id: 'bybit',
    name: 'Bybit',
    url: 'https://www.bybit.com/invite?ref=AE8LJ',
    category: Category.CRYPTO,
    description: 'Best for trading futures. Professional platform with huge bonuses.',
    isHot: true
  },
  {
    id: 'freecash',
    name: 'Freecash',
    url: 'https://freecash.com/r/113379926278670292691',
    category: Category.EARNING,
    description: 'Fastest growing earning site. Instant withdrawals to crypto or PayPal.',
    isHot: true
  },
  {
    id: 'mobrog',
    name: 'Mobrog',
    url: 'https://mobrog.com/?membership_promotion=0&i_invite=25860752-6956864d55601&rkm=38',
    category: Category.EARNING,
    description: 'Dedicated global survey panels paying in Dollars/Euro via PayPal.',
    isHot: true
  },
  {
    id: 'iherb',
    name: 'iHerb',
    url: 'https://www.iherb.com/?rcode=KQB9030',
    category: Category.SHOPPING,
    description: 'Best source for supplements & health products worldwide.',
    code: 'KQB9030',
    isHot: true
  },
  {
    id: 'clickworker',
    name: 'Clickworker',
    url: 'https://www.clickworker.com/clickworker?customer=false&utm_source=14933405&utm_campaign=CW4CW&utm_medium=email',
    category: Category.EARNING,
    description: 'Professional micro-tasks and AI training data jobs available worldwide.',
    isHot: true
  },
  {
    id: 'bitget',
    name: 'Bitget',
    url: 'https://www.bitgetapp.com/referral/register?clacCode=AVJ2TNC5&from=%2Fevents%2Freferral-all-program&source=events&utmSource=PremierInviter',
    category: Category.CRYPTO,
    description: 'Top choice for Copy Trading. Follow expert traders automatically.',
    isHot: true
  },

  // ==========================================
  // TIER 3: STRONG ALTERNATIVES & TOOLS
  // ==========================================
  {
    id: 'okx',
    name: 'OKX',
    url: 'https://okx.com/join/26545988',
    category: Category.CRYPTO,
    description: 'Advanced Web3 wallet and exchange. Access the decentralized world.',
    isHot: true
  },
  {
    id: 'rain',
    name: 'Rain',
    url: 'https://rain.com/en?ref=HQ5KSF4',
    category: Category.CRYPTO,
    description: 'Fully licensed and regulated. The safest local fiat on-ramp.'
  },
  {
    id: 'manus',
    name: 'Manus AI',
    url: 'https://manus.im/invitation/T3N6K1JGSULV',
    category: Category.AI,
    description: 'Revolutionary AI productivity tool for creators.',
    isHot: true
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    url: 'https://try.elevenlabs.io/xjswm62gtsmv',
    category: Category.AI,
    description: 'The most realistic AI voice generator and text-to-speech.'
  },
  {
    id: 'kucoin',
    name: 'KuCoin',
    url: 'https://www.kucoin.com/r/rf/QBSAM29Z',
    category: Category.CRYPTO,
    description: 'The "People’s Exchange". Great for finding hidden gem altcoins.'
  },
  {
    id: 'viefaucet',
    name: 'VieFaucet',
    url: 'https://viefaucet.com/?r=6446338f61bdcbf278c21f4f',
    category: Category.EARNING,
    description: 'Cleanest high-paying crypto faucet. Direct withdrawals.',
    isHot: true
  },

  // ==========================================
  // TIER 4: NICHE & SMALLER EARNINGS
  // ==========================================
  {
    id: 'gateio',
    name: 'Gate.io',
    url: 'https://www.gate.io/signup/BVIVAV1e?ref_type=103',
    category: Category.CRYPTO,
    description: 'Oldest exchange with the largest variety of coins listed.'
  },
  {
    id: 'swagbucks',
    name: 'Swagbucks',
    url: 'https://www.swagbucks.com/p/register?rb=138659214&rp=1',
    category: Category.EARNING,
    description: 'Classic rewards site. Good for casual earning via surveys/videos.'
  },
  {
    id: 'honeygain',
    name: 'Honeygain',
    url: 'https://r.honeygain.me/AZD70C789D',
    category: Category.EARNING,
    description: 'True passive income. Earn by sharing unused internet bandwidth.'
  },
  {
    id: 'phemex',
    name: 'Phemex',
    url: 'https://phemex.com/account/referral/invite-friends-entry?referralCode=C9VAW3',
    category: Category.CRYPTO,
    description: 'Efficient trading platform known for speed and reliability.'
  },
  {
    id: 'crypto_com',
    name: 'Crypto.com',
    url: 'https://crypto.com/app/f8vk9kas9w',
    category: Category.CRYPTO,
    description: 'Great mobile app. Famous for their metal Visa crypto cards.'
  },
  {
    id: 'pi_network',
    name: 'Pi Network',
    url: 'https://minepi.com/wolfy702',
    category: Category.CRYPTO,
    description: 'Mine crypto on your phone without draining battery.',
    code: 'wolfy702'
  },
  {
    id: 'pionex',
    name: 'Pionex',
    url: 'https://www.pionex.com/en/signUp?r=ARMO67xr',
    category: Category.CRYPTO,
    description: 'Exchange with built-in free trading bots (Grid, DCA).'
  },
  {
    id: 'cointiply',
    name: 'Cointiply',
    url: 'http://cointiply.com/r/6AJjp',
    category: Category.EARNING,
    description: 'Bitcoin faucet with a multiplier game and loyalty bonus.'
  },
  {
    id: 'replit',
    name: 'Replit',
    url: 'https://replit.com/refer/AHMEDALZAHRANI5',
    category: Category.AI,
    description: 'Build and host software collaboratively in your browser.'
  },
  {
    id: 'lovable',
    name: 'Lovable',
    url: 'https://lovable.dev/invite/MMHBH50',
    category: Category.AI,
    description: 'AI-powered development platform for rapid building.'
  },

  // ==========================================
  // TIER 5: SERVICES & WALLETS
  // ==========================================
  {
    id: 'fiverr',
    name: 'Fiverr',
    url: 'https://www.fiverr.com/pe/Ylp1Qa',
    category: Category.SHOPPING,
    description: 'Hire freelancers for any task starting at $5.'
  },
  {
    id: 'rakuten',
    name: 'Rakuten',
    url: 'https://www.rakuten.com/r/AZD702?eeid=28187',
    category: Category.SHOPPING,
    description: 'Get Cash Back at major stores (Walmart, Nike, etc).'
  },
  {
    id: 'faucetpay',
    name: 'FaucetPay',
    url: 'https://faucetpay.io/?r=5377007',
    category: Category.CRYPTO,
    description: 'Micro-wallet required for most faucets.'
  },
  {
    id: 'payeer',
    name: 'Payeer',
    url: 'https://payeer.com/?partner=15862340',
    category: Category.CRYPTO,
    description: 'Multi-currency e-wallet supporting both crypto and fiat.'
  },
  {
    id: 'icicle_bridge',
    name: 'Icicle Bridge',
    url: 'https://iciclebridge.com/invite/XVBX7X/',
    category: Category.CRYPTO,
    description: 'Cross-chain bridging solution.'
  },

  // ==========================================
  // TIER 6: MICRO-TASKS & OTHERS
  // ==========================================
  {
    id: 'sweatcoin',
    name: 'Sweatcoin',
    url: 'https://sweatco.in/i/igreat',
    category: Category.EARNING,
    description: 'Walk and earn. Encourages a healthy lifestyle.'
  },
  {
    id: 'pawnsapp',
    name: 'Pawns.app',
    url: 'https://pawns.app/?r=3168109',
    category: Category.EARNING,
    description: 'Share internet for passive income.'
  },
  {
    id: '2captcha',
    name: '2Captcha',
    url: 'https://2captcha.com/?from=10545900',
    category: Category.EARNING,
    description: 'Solve captchas for small amounts of cash.'
  },
  {
    id: 'timebucks',
    name: 'TimeBucks',
    url: 'https://timebucks.com/?refID=223736125',
    category: Category.EARNING,
    description: 'Various tasks: TikTok, Slideshows, clicks.'
  },
  {
    id: 'pollpay',
    name: 'Poll Pay',
    url: 'https://web.pollpay.app/login?invite_code=TNFPXC2ZMD',
    category: Category.EARNING,
    description: 'Mobile survey app.'
  },
  {
    id: 'bondex',
    name: 'Bondex',
    url: 'https://bdr3.app.link/P5G3Ip9hEEb', 
    category: Category.EARNING,
    description: 'Web3 professional network.'
  },
  {
    id: 'prizerebel',
    name: 'PrizeRebel',
    url: 'https://prizerebel.com/index.php?r=14689960',
    category: Category.EARNING,
    description: 'Survey rewards site.'
  },
  {
    id: 'surveytime',
    name: 'SurveyTime',
    url: 'https://surveytime.app/KyH-fHnhtz',
    category: Category.EARNING,
    description: '$1 per survey flat rate.'
  },
  {
    id: 'adbtc',
    name: 'adBTC',
    url: 'https://r.adbtc.top/1974077',
    category: Category.EARNING,
    description: 'View ads for Satoshi.'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    url: 'https://www.dropbox.com/referrals/AABut8VqsfDZGA0ZrN5WcwiwCbPW8aipUQ4?src=global9',
    category: Category.SHOPPING,
    description: 'Cloud storage.'
  },
  {
    id: 'joinhoney',
    name: 'Honey',
    url: 'https://joinhoney.com/ref/jn471ot',
    category: Category.SHOPPING,
    description: 'Coupon finder browser extension.'
  },
  {
    id: 'letyshops',
    name: 'LetyShops',
    url: 'https://letyshops.com/winwin?ww=33330750',
    category: Category.SHOPPING,
    description: 'Cashback service.'
  },
  {
    id: 'g2a',
    name: 'G2A',
    url: 'https://www.g2a.com/n/reflink-17801b8032',
    category: Category.SHOPPING,
    description: 'Game keys marketplace.'
  },
  {
    id: 'topcashback',
    name: 'TopCashback',
    url: 'https://www.topcashback.co.uk/ref/member11116518075517',
    category: Category.SHOPPING,
    description: 'Cashback site.'
  }
];