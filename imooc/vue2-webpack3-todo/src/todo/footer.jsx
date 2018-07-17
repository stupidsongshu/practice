import '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'squirrel'
    }
  },
  render() {
    return (
      <div class="main-footer">
        <span>{this.author}</span>
      </div>
    )
  }
}