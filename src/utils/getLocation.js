export function loadBMap(callback) {
  var script = document.createElement("script");
  script.src =
    "http://api.map.baidu.com/api?v=2.0&ak=KCMGHINxsK5aHGuO8PzOAupebyVwdNwE&callback=" +
    callback;
  document.body.appendChild(script);
}
// 获取定位方式二
export const getCurrentCityName = (myCity) => {
  return new Promise((resolve, reject) => {
    // let myCity = new BMap.LocalCity();
    myCity.getCurrentPosition(
      (position) => {
        /* let geoc = new BMap.Geocoder();
            geoc.getLocation(result.center, (rs) => {
                // rs 中携带着所有的定位信息，这里只获取了城市(city)和所在的区(district)
                let addComp = rs.addressComponents;
                let result = addComp.city + addComp.district;
                resolve(result);
            }); */
        let result = {
          province: position.address.province,
          city: position.address.city,
        };
        resolve(result);
      },
      { enableHighAccuracy: true }
    );
  });
};
