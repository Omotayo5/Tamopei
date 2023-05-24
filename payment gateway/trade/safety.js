// const userId = buy_tableBody.querySelector(' tr td .card-info1 span');
export async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  return data;
};
