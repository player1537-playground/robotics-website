from flask import Flask, render_template, g
app = Flask(__name__)

@app.before_request
def init():
    buttons = [("home", "Home"), ("first", "FIRST"), ("team", "The Team"), ("sponsors", "Sponsors"), ("resources", "Resources"), ("contactus", "Contact Us")]
    g.buttons = enumerate(buttons)
    g.buttlen = len(buttons)
    
@app.route("/")
@app.route("/page/<page>")
def show_page(page="home"):
    return render_template(page + '.html')

if __name__ == "__main__":
    app.run(debug=True)

