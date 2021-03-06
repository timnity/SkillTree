### EditorConfig
随着软件工程的发展，软件开发基本告别一个人单打独斗做超级英雄的时代，越来越讲究多人共同协作。

EditorConfig 帮助开发人员定义和维护跨编辑器（或IDE）的统一的代码风格。

一般使用场景是：一个开发人员用的编辑器是VS，另一个用Sublime，那么他们两个人的IDE设定是不一样的，这样就可能会有一个人代码缩进空一个tab，另一个人的代码缩进空2个space。所以大部分的编辑器厂商都默认遵守editorconfig规则，只要有一个项目文件，描述定义好基本的规范，则所有代码编辑器(IDE)就全部优先使用这个配置。

EditorConfig是用于配置IDE的。

下面是 .editorconfig 的样例
```
  # top-most EditorConfig file
  root = true

  # Unix-style newlines with a newline ending every file
  [*]
  end_of_line = lf
  insert_final_newline = true

  # Matches multiple files with brace expansion notation
  # Set default charset
  [*.{js,py}]
  charset = utf-8

  # 4 space indentation
  [*.py]
  indent_style = space
  indent_size = 4

  # Tab indentation (no size specified)
  [Makefile]
  indent_style = tab

  # Indentation override for all JS under lib directory
  [lib/**.js]
  indent_style = space
  indent_size = 2

  # Matches the exact files either package.json or .travis.yml
  [{package.json,.travis.yml}]
  indent_style = space
  indent_size = 2
```

#### 如何使用
把 .editorconfig 文件放入到你的项目文件中就行了。EditorConfig插件就查找当前被编辑文件所在的目录有么有一个名为 .editorconfig 的文件， 如果没有，则开始依次逐级向上查找当前目录的父目录，直到到达工程根目录，或者找到配置了root=true的配置文件。

#### 支持的属性

注意：并不是所有的属性都被每一个插件支持
    [这里](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties) 是官方列出的属性列表


属性名 | 类型 | 作用
---|--- | ---
ident_style | string | 设置为`tab`或`space`，告知编辑器强制使用 tab 或 智能 tab(将 tab 转为 space)
indent_size | number | 参数为数字，就是缩进多少啦
end_of_line | string | 设置为`lf`,`cr`,`crlf`来规定换行符
cahrset | string | 字符集
trim_trailing_shitespace | boolean | 设为 true 时，则在新建空行的时候，移除所有空格
insert_final_newline | boolean | 设为 true 时，会确保文件在保存的时候，底部总是以新行结尾
root | boolean | 特殊的属性，必须在配置文件的顶部。设为 true 的时候，EdotroConfig 插件不再向上查找

```
所有属性大小写不敏感。并且属性没设置的时候，编辑器就按自己的默认值来搞。
```
