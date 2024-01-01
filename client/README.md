Bu projede frontend kısmı için kullanılan teknolojiler

ReactJS , tailwindcss , React-Router-Dom

Bu proje vite ile oluşturulmuş bir react projesidir. 
Tailwindcss bir css framework'üdür ve stil düzenlemerini kolay bir şekilde ayarlamamıza olanak sağlamaktadır.
react-router-dom ise sayfaların render edilmesi ve sayfa geçişlerinin optimize olarak çalışmasını sağlamaktadır


pages   -> Chat.jsx tüm chat sayfasını kapsamaktadır
        -> Login.jsx login ekranı
        -> Register.jsx register ekranı

components  -> ChatBox -> Mesajlaşma ekranını temsil etmektedir
            -> ChatMessages -> Mesajlaşma ekranındaki mesajları temsil etmektedir. İçerisinde 2 farklı mesaj türü vardır. Bunlar karşıdan gelen mesajlar ve kullanıcının yolladığı mesajlara göre still değişikliği göstermektedir.
            ->chatList.jsx -> Mesajlaşılabilecek kullanıcıların, grupların listelendiği ve grup oluşturmak için seçim yapılan componenti kapsamaktadır.