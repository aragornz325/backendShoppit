const objeto = {
  name: 'hlas',
  descrioption: 'askjdañsjd',
  stock: 10,
  variation: [
    { name: 'hlas_1', descrioption: 'askjdañsjd', stock: 10 },
    { name: 'hlas_2', descrioption: 'askjdañsjd', stock: 10 },
    { name: 'hlas_3', descrioption: 'askjdañsjd', stock: 10 },
  ],
  total_stock: 0,
};

function totalStock(objeto) {
  let total = 0;
  objeto.variation.forEach((element) => {
    total += element.stock;
  });
  return total;
}
console.log(totalStock(objeto));
