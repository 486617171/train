export default function HotItem(props) {

    const { name, owner, stargazers_count, forks, open_issues, html_url, full_name } = props.data;

    const textConfig = [
        { icon: 'fa fa-star', name: 'stars', data: stargazers_count, color: 'rgb(255, 215, 0)' },
        { icon: 'fa fa-code-fork', name: 'forks', data: forks, color: 'rgb(129, 195, 245)' },
        { icon: 'fa fa-warning', name: 'Open issues', data: open_issues, color: 'rgb(241, 138, 147)' },
    ];

    return <div style={{ width: '23%', backgroundColor: 'rgba(0, 0, 0, 0.08)', marginTop: '20px', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center' }}>
            <h2>#{props.index + 1}</h2>
            <img src={owner.avatar_url} alt="" width="50%" />
            <p style={{ fontWeight: 600 }}><a href={html_url} target="_blank" rel="noopener noreferrer">{full_name}</a></p>
        </div>
        <div style={{ padding: '20px 40px' }}>
            <div>
                <i style={{ color: 'rgb(255, 191, 116)', width: '16px', textAlign: 'center' }} className="fa fa-user"></i>
                <a href={html_url} target="_blank" rel="noopener noreferrer">{name}</a>
            </div>
            {
                textConfig.map(item => <div key={item.name}><i style={{ color: item.color, width: '16px', textAlign: 'center' }} className={item.icon}></i>{item.data + ' ' + item.name}</div>)
            }
        </div>
    </div>
}