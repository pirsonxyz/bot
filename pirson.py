from flask import Flask, jsonify
from nba_api.live.nba.endpoints import scoreboard
import json

app = Flask(__name__)

@app.route('/games', methods=['GET'])
def get_games():
    # Today's Score Board
    games = scoreboard.ScoreBoard()

    # Parse JSON response
    data = json.loads(games.get_json())

    # Extract names, scores, teams, and time
    game_info = []
    for game in data['scoreboard']['games']:
        home_team = game['homeTeam']['teamName']
        home_score = game['homeTeam']['score']
        away_team = game['awayTeam']['teamName']
        away_score = game['awayTeam']['score']
        game_time = game['gameStatusText']
        
        game_info.append({
            'away_team': away_team,
            'away_score': away_score,
            'home_team': home_team,
            'home_score': home_score,
            'game_time': game_time
        })

    return jsonify(game_info)

if __name__ == '__main__':
    app.run(debug=True, port=6969)
