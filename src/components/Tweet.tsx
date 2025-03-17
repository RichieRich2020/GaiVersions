import CashtagMentioned from "./CashtagMentioned";
import ChartwithTool from "./ChartwithTool";
import CryptoPairStats from "./CryptoPairStats";
import InfluencerListExample from "./InfluencerListExample";
import TweetOwner from "./TweetOwner";


const Tweet =()=>{
    return (
        <>
        <TweetOwner
          name="Elon Musk"
          username="elonmusk"
          accountAge="2 Years 5 Days"
          avgViews={500}
          followers="300K"
          totalTweets="30K"
          tagMentions={50}
          profilePicture="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg"
          accountType="Influencer"
        />


<CashtagMentioned

cashinfo={
  {
    SHB: {
      TokenName: 'SHIB',
      TokenAge: '4 Years 224 Days',
      TokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
      MarketCap: 7282826466.016693,
      Mentions24h: 0,
      VolumeChange: 161582236.68313026,
      slug: null,
      category: 'token',
      description: 'Shiba Inu (SHIB) is a cryptocurrency and operates on the Ethereum platform...',
      num_market_pairs: 0,
      tags: null,
      chain_id: null,
      platform: '1027',
      date_launched: null,
      infinite_supply: false,
      self_reported_circulating_supply: null,
      self_reported_market_cap: null,
      self_reported_tags: null,
      urls: { website: [Array], twitter: [Array] },
      per_chg_1hr: -0.16043166,
      per_chg_24hr: -3.99938069,
      per_chg_7d: -10.16117739,
      cmc_rank: 20,
      max_supply: null,
      circulating_supply: 589253520015647.4,
      total_supply: 589506973609318.9,
      price: 0.000012359411049124154,
      market_cap_dominance: 0.2622,
      total_mentions: 1,
      contracts:  [
        {
          contract_address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
          platform_name: 'Ethereum',
          platform_coin_name: 'Ethereum',
          platform_coin_symbol: 'ETH'
        }
      ]
    },
    
  }
}





/>

<InfluencerListExample/>

        </>
    )
}

export default Tweet;