import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Badge } from '@/components/ui/badge';

type PageType = 'home' | 'tornado' | 'hurricane' | 'wildfire' | 'flood' | 'earthquake' | 'statistics' | 'research' | 'about' | 'contact';

const COLORS = ['#0EA5E9', '#F97316', '#8A898C', '#1EAEDB', '#403E43'];

const disasterData = [
  { year: '2019', торнадо: 1520, ураганы: 18, пожары: 50475, наводнения: 89, землетрясения: 9 },
  { year: '2020', торнадо: 1075, ураганы: 30, пожары: 58950, наводнения: 103, землетрясения: 7 },
  { year: '2021', торнадо: 1376, ураганы: 21, пожары: 58985, наводнения: 117, землетрясения: 11 },
  { year: '2022', торнадо: 1331, ураганы: 14, пожары: 68988, наводнения: 95, землетрясения: 13 },
  { year: '2023', торнадо: 1423, ураганы: 20, пожары: 56580, наводнения: 88, землетрясения: 8 },
];

const distributionData = [
  { name: 'Торнадо', value: 1423, color: '#0EA5E9' },
  { name: 'Ураганы', value: 20, color: '#1EAEDB' },
  { name: 'Пожары', value: 56580, color: '#F97316' },
  { name: 'Наводнения', value: 88, color: '#8A898C' },
  { name: 'Землетрясения', value: 8, color: '#403E43' },
];

const economicImpact = [
  { disaster: 'Ураганы', damage: 161.3 },
  { disaster: 'Наводнения', damage: 82.4 },
  { disaster: 'Землетрясения', damage: 74.5 },
  { disaster: 'Пожары', damage: 52.1 },
  { disaster: 'Торнадо', damage: 28.7 },
];

const recentDisasters = [
  { name: 'Землетрясение в Турции', coordinates: [37.0, 37.0], type: 'earthquake', date: 'Февраль 2023', magnitude: '7.8', color: '#403E43' },
  { name: 'Ураган Идалия', coordinates: [-83.0, 30.0], type: 'hurricane', date: 'Август 2023', magnitude: 'Кат. 3', color: '#0EA5E9' },
  { name: 'Пожары в Канаде', coordinates: [-120.0, 55.0], type: 'wildfire', date: 'Июль 2023', magnitude: '15M га', color: '#F97316' },
  { name: 'Наводнение в Ливии', coordinates: [22.0, 32.8], type: 'flood', date: 'Сентябрь 2023', magnitude: 'Шторм Даниэль', color: '#8A898C' },
  { name: 'Землетрясение в Марокко', coordinates: [-8.0, 31.0], type: 'earthquake', date: 'Сентябрь 2023', magnitude: '6.8', color: '#403E43' },
  { name: 'Торнадо в Миссисипи', coordinates: [-90.0, 33.0], type: 'tornado', date: 'Март 2023', magnitude: 'EF-4', color: '#1EAEDB' },
  { name: 'Пожары в Греции', coordinates: [23.0, 38.5], type: 'wildfire', date: 'Июль 2023', magnitude: '175K га', color: '#F97316' },
  { name: 'Наводнение в Пакистане', coordinates: [69.0, 30.0], type: 'flood', date: 'Август 2022', magnitude: '33M пострадавших', color: '#8A898C' },
];

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function Index() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [activeFilters, setActiveFilters] = useState<string[]>(['earthquake', 'hurricane', 'wildfire', 'flood', 'tornado']);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredDisasters = recentDisasters.filter(d => activeFilters.includes(d.type));

  const navigation = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'tornado', label: 'Торнадо', icon: 'TornadoIcon' },
    { id: 'hurricane', label: 'Ураганы', icon: 'CloudRain' },
    { id: 'wildfire', label: 'Пожары', icon: 'Flame' },
    { id: 'flood', label: 'Наводнения', icon: 'Waves' },
    { id: 'earthquake', label: 'Землетрясения', icon: 'Zap' },
    { id: 'statistics', label: 'Статистика', icon: 'BarChart3' },
    { id: 'research', label: 'Исследования', icon: 'FileText' },
    { id: 'about', label: 'О проекте', icon: 'Info' },
    { id: 'contact', label: 'Контакты', icon: 'Mail' },
  ];

  const renderHome = () => (
    <div className="space-y-8">
      <section className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold mb-4 text-foreground">Портал исследования стихийных бедствий</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Научный подход к изучению природных катаклизмов. Актуальные данные, статистика и исследования.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {[
          { icon: 'TornadoIcon', title: 'Торнадо', count: '1,423', description: 'зафиксировано в 2023', color: 'text-primary' },
          { icon: 'CloudRain', title: 'Ураганы', count: '20', description: 'тропических циклонов', color: 'text-primary' },
          { icon: 'Flame', title: 'Пожары', count: '56,580', description: 'лесных пожаров', color: 'text-accent' },
          { icon: 'Waves', title: 'Наводнения', count: '88', description: 'крупных наводнений', color: 'text-secondary' },
          { icon: 'Zap', title: 'Землетрясения', count: '8', description: 'магнитудой выше 7.0', color: 'text-muted-foreground' },
          { icon: 'TrendingUp', title: 'Ущерб', count: '$399B', description: 'экономические потери', color: 'text-destructive' },
        ].map((item, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Icon name={item.icon as any} className={`w-12 h-12 mb-2 ${item.color}`} />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{item.count}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="px-4 py-8">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Icon name="BookOpen" className="w-6 h-6 text-primary" />
              Что такое стихийные бедствия?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed">
              <strong>Стихийные бедствия</strong> — это природные явления катастрофического характера, 
              которые приводят к нарушению нормальной жизнедеятельности людей, разрушению материальных ценностей 
              и могут вызывать человеческие жертвы.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Layers" className="w-5 h-5 text-primary" />
                  Основные причины возникновения
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Геологические процессы</p>
                      <p className="text-sm text-muted-foreground">Движение тектонических плит, вулканическая активность, смещение горных пород</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Атмосферные явления</p>
                      <p className="text-sm text-muted-foreground">Циркуляция воздушных масс, перепады температур, влажности и давления</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Гидрологические факторы</p>
                      <p className="text-sm text-muted-foreground">Обильные осадки, таяние снега, повышение уровня водоемов</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Антропогенное влияние</p>
                      <p className="text-sm text-muted-foreground">Изменение климата, вырубка лесов, урбанизация территорий</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Target" className="w-5 h-5 text-primary" />
                  Классификация по происхождению
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-background rounded-lg border">
                    <p className="font-medium text-sm">🌍 Геофизические</p>
                    <p className="text-xs text-muted-foreground mt-1">Землетрясения, извержения вулканов, оползни</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border">
                    <p className="font-medium text-sm">🌪️ Метеорологические</p>
                    <p className="text-xs text-muted-foreground mt-1">Ураганы, торнадо, засухи, метели</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border">
                    <p className="font-medium text-sm">💧 Гидрологические</p>
                    <p className="text-xs text-muted-foreground mt-1">Наводнения, цунами, сели</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg border">
                    <p className="font-medium text-sm">🔥 Природные пожары</p>
                    <p className="text-xs text-muted-foreground mt-1">Лесные и степные пожары, торфяные возгорания</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm flex items-start gap-2">
                <Icon name="Info" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Научный факт:</strong> По данным ООН, за последние 20 лет количество стихийных бедствий 
                  увеличилось на 74%. Основная причина — изменение климата, вызванное деятельностью человека, 
                  что приводит к повышению частоты экстремальных погодных явлений.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Карта недавних бедствий</CardTitle>
            <CardDescription>Крупные стихийные бедствия 2022-2023 годов по всему миру</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { type: 'earthquake', label: 'Землетрясения', icon: 'Zap', color: '#403E43' },
                { type: 'hurricane', label: 'Ураганы', icon: 'CloudRain', color: '#0EA5E9' },
                { type: 'wildfire', label: 'Пожары', icon: 'Flame', color: '#F97316' },
                { type: 'flood', label: 'Наводнения', icon: 'Waves', color: '#8A898C' },
                { type: 'tornado', label: 'Торнадо', icon: 'Wind', color: '#1EAEDB' },
              ].map((filter) => (
                <Button
                  key={filter.type}
                  variant={activeFilters.includes(filter.type) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleFilter(filter.type)}
                  className="gap-2"
                  style={activeFilters.includes(filter.type) ? { backgroundColor: filter.color, borderColor: filter.color } : {}}
                >
                  <Icon name={filter.icon as any} className="w-4 h-4" />
                  {filter.label}
                </Button>
              ))}
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <ComposableMap
                projectionConfig={{
                  scale: 147,
                }}
                height={400}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#E5E7EB"
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: { fill: '#D1D5DB', outline: 'none' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {filteredDisasters.map((disaster, idx) => (
                  <Marker key={idx} coordinates={disaster.coordinates}>
                    <circle r={6} fill={disaster.color} stroke="#fff" strokeWidth={2} className="animate-pulse" />
                  </Marker>
                ))}
              </ComposableMap>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredDisasters.map((disaster, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: disaster.color }} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{disaster.name}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">{disaster.date}</Badge>
                      <Badge variant="secondary" className="text-xs">{disaster.magnitude}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Динамика стихийных бедствий 2019-2023</CardTitle>
            <CardDescription>Количество зарегистрированных событий по годам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={disasterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="торнадо" stroke="#0EA5E9" strokeWidth={2} />
                <Line type="monotone" dataKey="ураганы" stroke="#1EAEDB" strokeWidth={2} />
                <Line type="monotone" dataKey="наводнения" stroke="#8A898C" strokeWidth={2} />
                <Line type="monotone" dataKey="землетрясения" stroke="#403E43" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-6 px-4 pb-8">
        <Card>
          <CardHeader>
            <CardTitle>Распределение событий 2023</CardTitle>
            <CardDescription>Процентное соотношение типов бедствий</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Экономический ущерб</CardTitle>
            <CardDescription>Средний годовой ущерб в миллиардах USD</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={economicImpact}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="disaster" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="damage" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );

  const renderDisasterPage = (type: string) => {
    const info = {
      tornado: {
        title: 'Торнадо',
        icon: 'TornadoIcon',
        description: 'Торнадо — вихрь с вертикальной осью вращения, формирующийся в грозовых облаках',
        stats: [
          { label: 'Средняя скорость ветра', value: '177-322 км/ч' },
          { label: 'Продолжительность', value: '10-20 минут' },
          { label: 'Диаметр', value: '50-500 метров' },
          { label: 'Сезон активности', value: 'Март-Июнь' },
        ],
        facts: [
          'Шкала Фудзиты классифицирует торнадо от F0 до F5',
          'США лидирует по количеству торнадо — около 1,200 в год',
          'Самый разрушительный торнадо — 3 мая 1999 года в Оклахоме (скорость ветра 486 км/ч)',
        ],
      },
      hurricane: {
        title: 'Ураганы',
        icon: 'CloudRain',
        description: 'Тропический циклон с устойчивыми ветрами более 119 км/ч',
        stats: [
          { label: 'Скорость ветра', value: '119-252+ км/ч' },
          { label: 'Продолжительность', value: '1-3 недели' },
          { label: 'Диаметр', value: '100-1,500 км' },
          { label: 'Сезон', value: 'Июнь-Ноябрь' },
        ],
        facts: [
          'Шкала Саффира-Симпсона имеет 5 категорий интенсивности',
          'Ураган выделяет энергию эквивалентную 10,000 атомных бомб в день',
          'Глаз урагана — спокойная зона диаметром 30-60 км в центре',
        ],
      },
      wildfire: {
        title: 'Лесные пожары',
        icon: 'Flame',
        description: 'Неконтролируемое распространение огня в лесных массивах и степях',
        stats: [
          { label: 'Скорость распространения', value: 'до 22 км/ч' },
          { label: 'Температура', value: '800-1,200°C' },
          { label: 'Площадь охвата', value: 'от 1 га до тысяч км²' },
          { label: 'Пиковый сезон', value: 'Июль-Сентябрь' },
        ],
        facts: [
          '90% пожаров вызваны человеческой деятельностью',
          'Дым может переноситься на расстояние более 1,000 км',
          'Пожары 2019-2020 в Австралии уничтожили 18.6 млн гектаров',
        ],
      },
      flood: {
        title: 'Наводнения',
        icon: 'Waves',
        description: 'Затопление территорий в результате подъема уровня воды',
        stats: [
          { label: 'Скорость потока', value: 'до 40 км/ч' },
          { label: 'Высота волны', value: 'до 15 метров' },
          { label: 'Продолжительность', value: 'часы - недели' },
          { label: 'Причины', value: 'дожди, таяние, прорыв дамб' },
        ],
        facts: [
          'Наводнения — самый частый тип природных катастроф (40%)',
          'Ежегодно затрагивают более 250 млн человек',
          'Наводнение 1931 года в Китае унесло от 1 до 4 млн жизней',
        ],
      },
      earthquake: {
        title: 'Землетрясения',
        icon: 'Zap',
        description: 'Подземные толчки вызванные движением тектонических плит',
        stats: [
          { label: 'Магнитуда', value: '1.0-9.5 по Рихтеру' },
          { label: 'Продолжительность', value: '10-60 секунд' },
          { label: 'Глубина очага', value: '10-700 км' },
          { label: 'Частота (>5.0)', value: '~1,500 в год' },
        ],
        facts: [
          'Самое сильное — 9.5 магнитуды в Чили, 1960 год',
          'Ежегодно регистрируется около 500,000 землетрясений',
          'Только 100 из них причиняют ущерб',
        ],
      },
    };

    const current = info[type as keyof typeof info];

    return (
      <div className="space-y-6 px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Icon name={current.icon as any} className="w-16 h-16 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">{current.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{current.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {current.stats.map((stat, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ключевые факты</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {current.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Icon name="CheckCircle2" className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStatistics = () => (
    <div className="space-y-6 px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Статистика и данные</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Сравнительная динамика по годам</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={disasterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="торнадо" fill="#0EA5E9" />
              <Bar dataKey="ураганы" fill="#1EAEDB" />
              <Bar dataKey="наводнения" fill="#8A898C" />
              <Bar dataKey="землетрясения" fill="#403E43" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Общее количество</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">58,119</p>
            <p className="text-muted-foreground mt-2">событий в 2023 году</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Пострадавших</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">~250M</p>
            <p className="text-muted-foreground mt-2">человек по всему миру</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Экономический ущерб</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-destructive">$399B</p>
            <p className="text-muted-foreground mt-2">в год в среднем</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResearch = () => (
    <div className="space-y-6 px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Исследования</h1>
      
      {[
        {
          title: 'Влияние климатических изменений на частоту ураганов',
          date: '15 октября 2023',
          author: 'Институт климатологии',
          summary: 'Анализ показывает увеличение интенсивности тропических циклонов на 8% за последние 40 лет из-за потепления океанов.',
        },
        {
          title: 'Прогнозирование землетрясений: новые методы машинного обучения',
          date: '3 сентября 2023',
          author: 'Лаборатория сейсмологии MIT',
          summary: 'Разработана модель ИИ с точностью предсказания 73% для землетрясений магнитудой выше 5.0.',
        },
        {
          title: 'Связь между лесными пожарами и урбанизацией',
          date: '22 августа 2023',
          author: 'Центр экологических исследований',
          summary: 'Расширение городских территорий увеличило риск лесных пожаров на 45% в засушливых регионах.',
        },
      ].map((paper, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{paper.title}</CardTitle>
            <CardDescription>{paper.author} • {paper.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{paper.summary}</p>
            <Button variant="link" className="mt-4 px-0">
              Читать полностью <Icon name="ArrowRight" className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAbout = () => (
    <div className="px-4 py-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold mb-4">О проекте</h1>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <p className="text-lg">
            Портал исследования стихийных бедствий — это научно-образовательная платформа, предоставляющая 
            актуальную информацию о природных катаклизмах на основе проверенных данных и исследований.
          </p>
          <p>
            Наша миссия — повысить осведомленность общества о стихийных бедствиях, их причинах и последствиях, 
            а также способствовать развитию методов прогнозирования и минимизации ущерба.
          </p>
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2">Источники данных:</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• NOAA (National Oceanic and Atmospheric Administration)</li>
              <li>• USGS (United States Geological Survey)</li>
              <li>• Copernicus Emergency Management Service</li>
              <li>• EM-DAT International Disaster Database</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContact = () => (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-start gap-4">
            <Icon name="Mail" className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-muted-foreground">info@disasters-research.org</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon name="Phone" className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Телефон</h3>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon name="MapPin" className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Адрес</h3>
              <p className="text-muted-foreground">Москва, ул. Научная, д. 10</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'tornado': return renderDisasterPage('tornado');
      case 'hurricane': return renderDisasterPage('hurricane');
      case 'wildfire': return renderDisasterPage('wildfire');
      case 'flood': return renderDisasterPage('flood');
      case 'earthquake': return renderDisasterPage('earthquake');
      case 'statistics': return renderStatistics();
      case 'research': return renderResearch();
      case 'about': return renderAbout();
      case 'contact': return renderContact();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Icon name="CloudLightning" className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">DisasterHub</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage(item.id as PageType)}
                className="gap-2"
              >
                <Icon name={item.icon as any} className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <Button variant="outline" size="icon" className="lg:hidden">
            <Icon name="Menu" className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {renderPage()}
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2023 DisasterHub. Научный портал изучения стихийных бедствий</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;