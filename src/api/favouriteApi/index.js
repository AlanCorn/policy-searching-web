import request from "@/api/request";

// 请求头
const headers = {
    "Content-Type": "application/json",
};

const favourite = {
    // 获取收藏夹全部内容
    getFavouriteTitle(uid) {
        const form = new FormData();
        form.append("uid", uid);
        return request.post("/usr/getCollection", form, {
            headers,
        });
    },
    // 创建收藏夹
    createFavourite(uid, name) {
        const form = new FormData();
        form.append("uid", uid);
        form.append("name", name);
        return request.post("/usr/addCollection", form, {
            headers,
        });
    },
    // 收藏夹重命名
    changeFavouriteName(newName) {
        const form = new FormData();
        form.append("cid", newName.cid);
        form.append("name", newName.name);
        return request.post("/usr/updateCollection", form, {
            headers,
        });
    },
    // 删除收藏夹
    deleteFavourite(cid) {
        const form = new FormData();
        form.append("cid", cid);
        return request.post("/usr/deleteCollection", form, {
            headers,
        });
    },
    // 取消收藏
    cancelFavourite(uid, pid) {
        const form = new FormData();
        form.append("uid", uid);
        form.append("pid", pid);
        return request.post("/usr/cancelCollection", form, {
            headers,
        });
    },
    // 添加收藏政策
    saveFavourite(uid, pid, cid) {
        const form = new FormData();
        form.append("uid", uid);
        form.append("pid", pid);
        form.append("cid", cid);
        return request.post("/usr/collectPolicy", form, {
            headers,
        });
    },
}

export default favourite;