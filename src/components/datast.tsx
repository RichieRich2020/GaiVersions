const exampleData: {
    cashtag: string;
    count_mentions_last_24h: number;
    coins: Array<{
        // coin current data
        // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}
      id: string;//imp
      symbol: string;
      name: string;
      image_url: string;
  
      current_price: number;
      market_cap: number;
      market_cap_rank: number;
      fully_diluted_valuation: number;
      total_volume: number;
  
      high_24h_price: number;
      low_24h_price: number;
      price_change_24h: number;
      price_change_percentage_24h: number;
  
      market_cap_change_24h: number;
      market_cap_change_percentage_24h: number;
  
      circulating_supply: number;
      total_supply: number;
      max_supply: number;
      price_change_percentage_1h: number;
  
      inserted_at: string;
      updated_at: string;
  
    //   If a coin is listed on Binance and we are already receiving tickers data, then also fetch its OHLCV (candlestick) data from Binance.
    // https://api.binance.com/api/v3/klines?symbol=SHIBUSDT&interval=1h&limit=3000
    //  coincurrent data
    // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids={id}",
      if_listed: boolean;          
  
      tickers: Array<{
        base: string;
        target: string;
        market: {
          name: string;
          identifier: string;
          has_trading_incentive: boolean;
        };
      }>;
   
      token_address?: string;

      chain_id?: string;//imp
    //   coincurrent data
    //   https://api.dexscreener.com/tokens/v1/${chain_id}/${token_address}
    //   OHLCV
    //   https://api.geckoterminal.com/api/v2/networks/${networks}/pools/${pair_address}/ohlcv/${unit}
      token_pairs_info?: Array<{
        pair_address: string;
        pair_name: string;
        price_in_usd: string;
        volume_h24: number;
        market_cap_in_usd: string;
        fdv_in_usd: string;
        network: {
          name: string;
          image_url: string | null;
        };
        dex: {
          name: string;
          image_url: string | null;
        };
        tokens: Array<{
          name: string;
          symbol: string;
          address: string;
          image_url: string;
        }>;
        pair_creation_date: string | null;
      }>;
    }>;
    tokens: Array<{
    //   tokencurrent data
    //   https://api.dexscreener.com/tokens/v1/${chain_id}/${token_address}
    //   OHLCV
    //   https://api.geckoterminal.com/api/v2/networks/${networks}/pools/${pair_address}/ohlcv/${unit}
      token_address: string;//imp
      name: string;
      symbol: string;
      chain_id: string;//imp
      token_pairs_info: Array<{
        pair_address: string;//imp
        pair_name: string;
        price_in_usd: string;
        volume_h24: number;
        market_cap_in_usd: string;
        fdv_in_usd: string;
        network: {
          name: string;
          image_url: string | null;
        };
        dex: {
          name: string;
          image_url: string | null;
        };
        tokens: Array<{
          name: string;
          symbol: string;
          address: string;
          image_url: string;
        }>;
        pair_creation_date: string | null;
      }>;
    }>;
  }[] = [];
  