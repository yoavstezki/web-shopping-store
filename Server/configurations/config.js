module.exports = {
    database: 'mongodb://localhost:27017',
    secret: 'mysecrete',
    jwt: {
        jwtSecret: "MyS3cr3tK3Y",
        jwtSession: {
            session: false
        }
    }
}