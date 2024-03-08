export const sortOrders = (arrOrders) => {
  const newDataOrders = arrOrders?.map((every) => {
    const {
    //   category_name,
    //   code_category,
    //   timestamp,
    //   establishment_name,
    //   foto,
    //   photo,
    //   posuda_price,
    //   product_categoria,
    //   product_name,
    //   product_percent,
    //   status,
    //   sort,
    //   still,
    //   v_ves,
    //   ves_name,
      code_establishment,
      codeid,
      product_price,
      ...rest
    } = every;
    const code_estabs = code_establishment;
    const codeid_products = codeid;
    const price = product_price;
    const count_posuda = 1;

    return { code_estabs, codeid_products, price, count_posuda, ...rest };
  });

  return newDataOrders;
};
