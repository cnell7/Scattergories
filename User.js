const user_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

class User {

    constructor (id, user, password) {
        this.id = id;
        this.user = user
        this.password = password
        this.totalWins = 0;
    }

    update (pass) {
        this.password = pass;
        user_data.set(this.id.toString(), this);
    }

    delete () {
        user_data.del(this.id.toString());
    }
} 

User.getAllIDs = () => {
    return Object.keys(user_data.data).map(id => parseInt(id));
};

User.getAllIDsForOwner = (user) => {
    return Object.keys(user_data.data).filter(id => user_data.get(id).user == user).map(id => parseInt(id));
}

User.findByID = (id) => {
    let udata = user_data.get(id);
    if (udata != null) {
        return new User(udata.id, udata.user, udata.password);
    }
    return null;
};

User.next_id = User.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

User.create = (user, password) => {
    let id = User.next_id;
    user.next_id += 1;
    let u = new User(id, user, password);
    user_data.set(u.id.toString(), u);
    return u;
}

module.exports = User;