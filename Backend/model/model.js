import Sequelize from "sequelize";
import db from "./sequelize.js";

const User = db.define(
  "user",
  {
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: Sequelize.CHAR,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: Sequelize.CHAR,
      allowNull: false,
    },
    refresh_token: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

const Match = db.define(
  "match",
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    home_team: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    away_team: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    stadium_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    referee_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    linesman_1: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    linesman_2: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

const Stadium = db.define(
  "stadium",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // team_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,          
    // },
    no_of_rows: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    seats_per_row: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
)

const Team = db.define(
  "team",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }, 
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

const Referee = db.define(
  "referee",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

const Ticket = db.define(
  "ticket",
  {
    ticket_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    match_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    seat_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

//Relationships

//stadium and team, one to one    TO BE CLARIFIED LATER
// Stadium.hasOne(Team, { foreignKey: "team_id" });

//user and tickets, one to many
User.hasMany(Ticket, { foreignKey: "username" });

//match and tickets, one to many
// Match.hasMany(Ticket, { as: 'match', foreignKey: "match_id" });
Ticket.belongsTo(Match, { as: 'match', foreignKey: "match_id" });

//match and stadium, one to one
Match.belongsTo(Stadium, { foreignKey: "stadium_id" });

//match and referee, one to one
Match.belongsTo(Referee, { as: 'referee', foreignKey: "referee_id" });
Match.belongsTo(Referee, { as: 'linesman1', foreignKey: "linesman_1" });
Match.belongsTo(Referee, { as: 'linesman2', foreignKey: "linesman_2" });

//match and team, one to many
Match.belongsTo(Team, { as: 'hometeam', foreignKey: "home_team" });

//match and team, one to many
Match.belongsTo(Team, { as: 'awayteam', foreignKey: "away_team" });

//team and stadium, one to one
// Team.belongsTo(Stadium, { foreignKey: "stadium_id" });

// db.sync({ force: true }).then(() => {
//     console.log(`Database & tables created!`)
// }).catch(err => {
//     console.log('Error: ' + err)
// });

export { User, Match, Stadium, Team, Referee, Ticket };
