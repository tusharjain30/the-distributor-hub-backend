const db = {
    development: {
        mongo: {
            host: 'localhost',
            port: 27017,
            database: 'TheDistributorHubDevelopment'
        },
        redis: {
            host: 'localhost',
            port: 6379
        }
    },
    staging: {
        mongo: {
            host: 'localhost',
            port: 27017,
            database: 'TheDistributorHubStage'
        },
        redis: {
            host: 'localhost',
            port: 6379
        }
    },
    production: {
        mongo: {
            host: 'localhost',
            port: 27017,
            database: 'TheDistributorHubLive'
        },
        redis: {
            host: 'localhost',
            port: 6379
        }
    }
};

export default db;
