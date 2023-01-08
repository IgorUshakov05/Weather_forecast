const button = document.getElementById('button');
const input = document.getElementById('input');
const title = document.getElementById('title')
const windSpeed = document.getElementById("windSpeed")
const temp = document.getElementById('temp')
const tempLike = document.getElementById('tempLike')

function inner(x, y, z,w) {
  title.innerHTML = `Город: ${x}`
  temp.innerHTML = `Температура: ${Math.round(y)}`
  windSpeed.innerHTML = `Скорость ветра: ${w}м/с`
  tempLike.innerHTML = `Ощущается: ${Math.round(z)}`
}

const serach = (text = "Новосибирск") => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=04a1b7f761ab67677def7fac6c96a829`)
  .then((obj) => {
    if (obj.status == 200) { 
      return obj.json()
    }
    else {
      setTimeout(() => {
        input.style.border = "1px solid red"
        input.value = ""
      }, 500)
      setTimeout(() => {
        input.style.border = "1px solid black"
      }, 2000)
}
    })

   .then((obj) =>{
     inner(obj.name, obj.main.temp, obj.main.feels_like,obj.wind.speed)
    console.log(`Город: ${obj.name}
Температура: ${obj.main.temp}
Скорость ветра: ${obj.wind.speed}м/c
Ощущается: ${obj.main.feels_like}
  `)})
  .then(() => {
    document.getElementById("app").style.display = "inline";
  })
  .catch((err) => {
    console.log("Возникла ошибка");
  })
}
button.addEventListener('click',() => {
  if (input.value.trim() == "") {
    setTimeout(() => {
      input.style.border = "1px solid red"
      button.style.border = "1px solid red"
    }, 500)
    setTimeout(() => {
      input.style.border = "1px solid black"
      button.style.border = "1px solid black"
    }, 2000)
  }
  
  serach(input.value.trim())
})
