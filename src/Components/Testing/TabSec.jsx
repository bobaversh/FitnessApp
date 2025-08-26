export default function TabSec ({active, onChange}) {
    return (
        <section>
            <button isActive={active==='sosal'}onClick = {()=>onChange('sosal')}>Сосал</button>
            <button isActive={active==='main'}onClick = {()=>onChange('main')}>Главная</button>
        </section>
    )
}