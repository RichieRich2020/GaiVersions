export const  getCoinCurrMarketData = async (id)=> {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching market data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getCoinCurrMarketData:', error);
      return null;
    }
  }
  
  export const getTokenCurrMarketData = async (chain_id, token_address) => {
    const url = `https://api.dexscreener.com/tokens/v1/${chain_id}/${token_address}`;
    console.log("datadata");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching token market data: ${response.statusText}`);
      }
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error in getTokenCurrMarketData:', error);
      return null;
    }
  };
  
  export const convertDataToFormattedObject = async (data) => {
    if (data.length === 0) return [];
    const formattedData = {};
  
    data?.forEach((item) => {
      const cashtag = item?.cashtag || "Unknown";
      const count_mentions_last_24h = item?.count_mentions_last_24h || 0;
  
      const coins = item.coins || [];
      const tokens_pairs = item.tokens_pairs||[]
  
      coins?.forEach((ele) => {
        // Find ticker from Binance market
        let ticker = "";
        let pairName   = ""
        if (ele.tickers && Array.isArray(ele.tickers)) {
          const binanceTicker = ele.tickers.find(t => t.market_name === "Binance");
          if (binanceTicker) {
            ticker = `${binanceTicker.base}${binanceTicker.target}`;
            pairName =`${binanceTicker.base}/${binanceTicker.target}`;
          }
        }
        // If ticker is N/A, pull pairs data
        let pairs = null;
        if (ticker === "" && ele.pairs) {
          pairs = {
            pair_name: ele.pairs?.pair_name || null,
            pair_address: ele.pairs?.pair_address || null,
            price_in_usd: ele.pairs?.price_in_usd || null,
            volume_h24_usd: ele.pairs?.volume_h24_usd || null,
            market_cap_in_usd: ele.pairs?.market_cap_in_usd || null,
            fdv_in_usd: ele.pairs?.fdv_in_usd || null,
            chain_id: ele.pairs?.chain_id || null,
            dex: ele.pairs?.dex || null,
            pair_creation_date: ele.pairs?.pair_creation_date || null,
          };
        }
  
        const formattedItem = {
          id:ele?.id||"",
          category: ele?.category || "N/A",
          TokenName: ele?.name || "Unknown",
          Symbol: ele?.symbol || "N/A",
          TokenAge: "AGE", // Placeholder
          TokenLogo: ele?.image_url || "",
          MarketCap: ele?.market_cap || 0,
          Mentions24h: count_mentions_last_24h,
          current_price:ele?.current_price ,
          total_volume: ele?.total_volume || 0,
          price_change_percentage_1hr: ele?.price_change_percentage_1hr || 0,
          price_change_percentage_24hr: ele?.price_change_percentage_24hr || 0,
          price_change_percentage_30day: ele?.price_change_percentage_30day || 0,
          circulating_supply: ele?.circulating_supply || "N/A",
          total_supply: ele?.total_supply || "N/A",
          max_supply: ele?.max_supply || "N/A",
          cmc_rank: ele?.market_cap_rank || "N/A",
          token_address: ele?.token_address || [],
          //   chain_id: ele?.chain_id || "N/A",
          ticker: ticker,
          pairs: pairs, // ✅ Add pairs if ticker is N/A, otherwise will be null
          pairName:pairName||pairs?.pair_name,
        };
  
        // Add to formattedData
        if (!formattedData[cashtag]) {
          formattedData[cashtag] = [];
        }
        formattedData[cashtag].push(formattedItem);
      });
  
      tokens_pairs?.forEach((ele) => {

      //   [
      //     {
      //         "cashtag": "gork",
      //         "count_mentions_last_24h": 58,
      //         "coins": [],
      //         "tokens_pairs": [
      //             {
      //                 "token_address": "A1KysWJzqMV1ui1jbzpHvX9ufebn13PZoUicngPtpump",
      //                 "token_image": "https://assets.geckoterminal.com/s1bi6e5guikqx3y08dl4r88y5gxq",
      //                 "token_name": "Body Of Gorilla, Head Of Shark",
      //                 "token_symbol": "GORK",
      //                 "chain_id": "solana",
      //                 "pairs": {
      //                     "pair_name": "Gork / SOL",
      //                     "pair_address": "6KAf2WJZEcxjpmvuWbxbJi4KQP2m5A9h6azxW9vozeM1",
      //                     "price": 9.937e-8,
      //                     "price_in_usd": 0.0000143,
      //                     "total_liquidity_usd": 13831.12,
      //                     "volume_h24_usd": 2264791.91,
      //                     "market_cap_in_usd": 14306,
      //                     "fdv_in_usd": 14306,
      //                     "price_ch_per_h24": -75.77,
      //                     "network": "solana",
      //                     "dex": "pumpswap",
      //                     "is_cg_listed": false,
      //                     "pair_creation_date": "2025-05-05T01:55:13"
      //                 }
      //             }
      //         ]
      //     }
      // ]
      //   let pairs = null;
  
      //     pairs = {
      //       chain_id:ele?.network,
      //       pair_name:  ele?.pair_name|| null,
      //       pair_address: ele?.pair_address|| null,
      //       price_in_usd: ele?.price_in_usd || null,
      //       volume_h24_usd: ele?.volume_h24_usd || null,
      //       market_cap_in_usd:  ele?.market_cap_in_usd || null,
      //       fdv_in_usd: ele?.fdv_in_usd || null,
      //       chain_id:ele?.chain_id  || null,
      //       dex: ele?.dex || null,
      //       pair_creation_date: ele?.pair_creation_date || null,
      //     };
        
        const formattedItem = {
          is_cg_listed:ele?.is_cg_listed,
          id:ele?.id||"",
          category: "token",
          TokenName: ele?.token_name || "Unknown",
          Symbol: ele?.token_symbol || "N/A",
          TokenAge: "AGE", // Placeholder
          TokenLogo: ele?.token_image || "",
          MarketCap: ele?.pairs?.market_cap_in_usd || 0,
          token_address:ele?.token_address,
          pair_address:ele?.pairs?.pair_address,
          volume_h24_usd:ele?.pairs?.volume_h24_usd,
          Mentions24h: count_mentions_last_24h,
          current_price:ele?.pairs?.price_in_usd ,
          price_change_percentage_1hr: ele?.price_ch_per_h1 || 0,
          price_change_percentage_6hr: ele?.price_ch_per_h6 || 0,
          price_change_percentage_24hr: ele?.price_ch_per_h24 || 0,
          //   chain_id: ele?.?chain_id || "N/A",
          pairName: ele?.pairs?.pair_name,
          pair_image:ele?.pair_image,
          total_liquidity_usd:ele?.pairs?.total_liquidity_usd,
          fdv_in_usd:ele?.pairs?.fdv_in_usd,
          dex:ele?.dex,
          pairs:ele?.pairs
        };
  
        // Add to formattedData
        if (!formattedData[cashtag]) {
          formattedData[cashtag] = [];
        }
        formattedData[cashtag].push(formattedItem);
      });
    });
  
    return  formattedData;
  }