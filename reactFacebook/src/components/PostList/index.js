import React, {Component} from 'react';
import './style.css'
import Post from '../Post/index';
import rocket from '../../assets/rocket.png'

class PostList extends Component {
  state = {
    posts:[
      {
        id: 1,
        author: {
          name: "Santa Teresa de Jesus",
          avatar: "https://aleteiaportuguese.files.wordpress.com/2017/10/web-saint-october-15-teresa-of-avila-public-domain.jpg?quality=100&strip=all&w=620&h=310&crop=1"
        },
        date: "‎4 out 1582",
        content: "Não sei verdadeiramente como se pode pensar na Rainha dos Anjos, no tempo em que passou com o Menino Jesus, sem dar graças a São José, pelo auxílio que lhes prestou.",
        comments: [
          {
            id: 1,
            author: {
              name: "Santa Teresa Benedita da Cruz",
              avatar: "http://agencia.fapesp.br/agencia-novo/lib/photo.php?src=http://agencia.fapesp.br/agencia-novo/Control/../imagens/noticia/21667.jpg&w=395"
            },
            content: "Que possamos voltar o olhar à Mãe de Deus, Maria, nas bodas de Caná O seu olhar silencioso e perscrutador observa tudo e repara onde falta alguma coisa. E antes que alguém perceba e ocorra algum embaraço,ela já prestou a sua ajuda. Encontra meios e modos, dá as indicações necessárias, e isso tudo em silêncio, sem deixar perceber nada."
          },
          {
            id: 2,
            author: {
              name: "Beata Maria Maravilhas de Jesus",
              avatar: "http://4.bp.blogspot.com/-zkMvrJ-a7j0/UFoM0sbfagI/AAAAAAAAB9Q/jlldNdZ8Wpw/s1600/Santa+Madre+Maravilha+de+Jesus.jpg"
            },
            content: "Aprenda no coração de sua Mãe como se ama a Jesus"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "São João da Cruz",
          avatar: "https://pantokrator.org.br/po/wp-content/uploads/2018/12/Capas-1-1-1024x576.jpg"
        },
        date: "14 dez 1591",
        content: " Ó Senhor, Deus meu! Quem te buscará com amor puro e singelo que deixe de imaginar muito a seu gosto e vontade, pois que és tu o primeiro a mostrar- te e sais ao encontro daqueles que te desejam?",
        comments: [
          {
            id: 1,
            author: {
              name: "Santa Elisabete da Trindade",
              avatar: "https://1.bp.blogspot.com/-fqpk3oLZvpM/Un7BKyE0E7I/AAAAAAAABdA/SdYqCqgUVF4/s400/Beata+Elisabete+da+Trindade,+Virgem+Carmelita+Descal%C3%A7a+(foto+grande+do+rosto)+(2).jpg"
            },
            content: "Se caio a cada instante, na fé confiante farei com que Ele me levante."
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Santa Teresinha do Menino Jesus",
          avatar: "https://lh5.googleusercontent.com/proxy/3pa4Ln5bU-TaeWKbcg14i_nrpy0HfWnlgzGO-6tmJi7U0Ghbvkv-IFuCfrgpuV-QEMYg5rItWDUZUa3f1YLkngMzJDAf719e3o63WVeACK5i3LLLWIvmwJQWrF6ilASYJ1g=s0-d"
        },
        date: "30 set 1897",
        content: "Invoca teu Deus, cujo amor é tão terno, confia-lhe o futuro!",
        comments: [
          {
            id: 1,
            author: {
              name: "Serva de Deus, Madre Maria José de Jesus",
              avatar: "https://scontent.fbsb8-1.fna.fbcdn.net/v/t1.0-9/50221131_2138382396205175_4930642268492136448_n.jpg?_nc_cat=106&_nc_oc=AQmNwtflhg0OFfxh0UYUOEbkU6UUv2IAVw2cbGeLMWe5HBIZnX4Mp2U5WvMgkvHekdR0sp1_Zb43aFuDVkTD68BB&_nc_ht=scontent.fbsb8-1.fna&oh=94b80421f0a384b5b337a0d088a3b0c5&oe=5E5E1971"
            },
            content: " Na união com Deus acha-se força para tudo, e a alma fica tão cativa da divina formosura, que se desprende quase involuntariamente das misérias que antes lhe detinham os passos."
          },
          {
            id: 2,
            author: {
              name: "Santa Teresa dos Andes",
              avatar: "https://cleofas.com.br/wp-content/uploads/2017/07/santa-teresa-768x768.jpg"
            },
            content: " Os corações dos homens amam um dia e, no outro, são indiferentes. Só Deus não muda."
          },
          {
            id: 3,
            author: {
              name: "São Tomás de Aquino",
              avatar: "https://www.iquilibrio.com/blog/wp-content/uploads/2018/01/sao_tomas_blog-768x478.jpg"
            },
            content: "Não se opor ao erro é aprová-lo, não defender a verdade é negá-la."
          }
        ]
      },
    ]
  }

  render(){
    return (
    <div className="containerPostList">

      {this.state.posts.map(post =><Post key={post.id} data={post} />)}
      <img src={rocket} alt=""/>
    </div>
    )
  }
}

export default PostList;