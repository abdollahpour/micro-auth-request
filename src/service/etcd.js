const { Etcd3 } = require('etcd3');

const client = process.env.ETCD_URL ? new Etcd3(process.env.ETCD_URL) : undefined;

export async function enrich(user) {
    if (client && user.email) {
        try {
            const queryString = await client.get(`/user/${user.email}`);
            const object = new URLSearchParams(queryString);
            return { ...object, ...user };
        } catch (e) {
            console.error(e);
        }
    }
    return user;
}
