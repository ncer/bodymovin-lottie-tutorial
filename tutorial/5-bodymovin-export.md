# Экспорт анимаций с помощью Bodymovin

Перед первым запуском Bodymovin, возможно, потребуется дать сценариям разрешение на запись. В русифицированной версии: `Правка => Настройки => Общие => Разрешить для сценариев запись файлов и доступ к сети`.

## Окно Bodymovin

[![encoded-expressions](/assets/bm_render.jpg)](https://raw.githubusercontent.com/ncer/bodymovin-lottie-tutorial/master/assets/bm_render.jpg)

Если список доступных для рендера композиций пуст, нужно обновить его.

## Окно настроек рендера

[![encoded-expressions](/assets/bm_render-opts.jpg)](https://raw.githubusercontent.com/ncer/bodymovin-lottie-tutorial/master/assets/bm_render-opts.jpg)

В целом настройки рендера можно не трогать, но я бы все равно отметил пункт Original Asset Names, чтобы сохранить оригинальные названия картинок.

Можно еще отметить пункт Demo, тогда при рендере автоматически создастся html файл, который можно открыть в браузере и посмотреть, что получилось. Однако, поскольку мы не добавляли в нашу композицию никакого фона, вся анимация будет на том фоне, который у браузера по умолчанию (обычно это белый).

Описание всех настроек можно найти здесь http://airbnb.io/lottie/after-effects/bodymovin-settings.html

После того, как сохранены все настройки, выбираем композицию для рендера, указываем папку для сохранения и жмем зеленую кнопку Render. На выходе мы получим json файл со всеми нашими анимациями.

---

&larr; [Создание анимаций в After Effects](/tutorial/4-aftereffects-animations.md) | 
[Содержание](/SUMMARY.md) | 
[Работа с Lottie](/tutorial/6-lottie.md) &rarr;