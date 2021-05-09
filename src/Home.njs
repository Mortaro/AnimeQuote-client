import Nullstack from "nullstack";
import "./Home.scss";
import Button from "./components/Button.njs";
import Card from "./components/Card.njs";

class Home extends Nullstack {
  searchInput = "";
  quotes = [];

  prepare({ project, page }) {
    page.title = `Home`;
    page.description = `${project.name} foi feito com Nullstack ヽ(^◇^*)/`;
  }

  async initiate() {
    const quote = await this.randomQuote();
    this.quotes = [quote];
  }

  static async randomQuote({ database }) {
    return await database.collection('quotes').aggregate({ $sample: {size: 1} }).next()
  }

  static async characterQuotes({ database, name }) {
    return await database.collection('quotes').find({
      $or: [
        { character: { $regex: ".*" + name + ".*", $options: "i" } },
        { anime: { $regex: ".*" + name + ".*", $options: "i" } },
      ],
    }).toArray()
  }

  async getQuotes() {
    this.quotes = await this.characterQuotes({name: this.searchInput})
  }

  render() {
    return (
      <form class="container flex flex-col home" onsubmit={this.getQuotes}>
        <div class="self-center text-4xl font-semibold pt-3">
          Citações de Anime
        </div>
        <div class="self-center text-1xl font-medium pt-3">
          Busque por frases icônicas de personagens
        </div>
        <div class="self-center w-6/12 relative flex my-3">
          <input
            bind={this.searchInput}
            value={this.searchInput}
            type="text"
            placeholder="Ex: Goku ou Dragon Ball..."
            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-purple-500 outline-none w-full pr-10"
          />
          <button
            class="text-center cursor-pointer text-white bg-purple-500 z-10 h-full leading-snug absolute rounded w-12 right-0 pt-3 hover:bg-purple-600"
          >
            <i class="fas fa-search fa-lg"></i>
          </button>
        </div>
        <Button
          text="Citação aleatória"
          onclick={this.initiate}
          class="self-center bg-purple-500 text-white rounded hover:bg-purple-600 p-2"
        />
        <div class="self-center w-6/12  mt-5">
          {this.quotes.map((quote) => (
            <Card quote={quote} />
          ))}
        </div>
      </form>
    );
  }
}

export default Home;