zadania = JSON.parse(localStorage.getItem("zadania")) || [] 
wyswietl()
// tu jest funkcja do tworzenia nowych zadań
document.getElementById("createmod").onclick = () => {
    let nazwa = document.getElementById("nazwa").value.trim()
    let wybory = document.getElementById("wybory").value
    if (nazwa !== "") {
        let nowezad = {
            nazwa: nazwa,
            wybory: wybory,
            wykonane: false
        }
         zadania.push(nowezad)
         zapiszzad()
         wyswietl()
    }
}

//prosta funkcja do zapisywania zadań w localstorage 
function zapiszzad(){
    localStorage.setItem("zadania", JSON.stringify(zadania))
}
//a tu fukcja to wyświetlania zadań i sortowania priorytetami
function wyswietl(){
    let kontener = document.getElementById("kontener")
    kontener.innerHTML = ""
    let sortZadania = zadania.slice().sort((a, b) => {
        let priorityOrder = { wysoki: 3, średni: 2, niski: 1 };
        return priorityOrder[b.wybory] - priorityOrder[a.wybory];
    });
    sortZadania.forEach((zadanie, index) => {
        let mzadanie = document.createElement("div")
        mzadanie.classList.add("stzad")
    let status = "w trakcie"
    if (zadanie.wykonane) {
        status = "wykonane"
    }
    let zadinfo = document.createElement("p")
    zadinfo.innerText = zadanie.nazwa + " - " + zadanie.wybory
    let malyx = document.createElement("img")
    malyx.src = "image2.png"
    malyx.classList.add("X")
    malyx.onclick = () => {
       zadania.splice(index, 1)
       zapiszzad()
       wyswietl()
    }
    let btnconf =document.createElement("button")
    btnconf.innerText = "Wykonane"
    btnconf.classList.add("zatwierdz")
    btnconf.onclick = () => {
        zadanie.wykonane = !zadanie.wykonane
        zapiszzad()
        wyswietl()
    }
    mzadanie.appendChild(btnconf)
    mzadanie.appendChild(malyx)
    mzadanie.appendChild(zadinfo)
    kontener.appendChild(mzadanie)
   });
}
document.querySelector("img").addEventListener("click", () => {
    confirm("Czy chcesz wyczyścić wszystkie zadania?")
    localStorage.removeItem("zadania")
    location.reload()
})
