# vim使用指南

## 1. 三种模式

- 命令模式
- 输入模式
- 尾行模式

命令之间的切换

![image-20211017204435471](/Users/lvhuihao/Library/Application Support/typora-user-images/image-20211017204435471.png)

其他模式

- 可视模式
- 替换模式

## 2. 命令模式

- 光标移动

  | 命令 | 全称 | 说明 |
  | ---- | ---- | ---- |
  | j/+  |      | 向下 |
  | k/-  |      | 向上 |
  | h    |      | 向左 |
  | l    |      | 向右 |

  数字+方向：指定移动的行数/字符数

- 行内移动

  | 命令 | 全称 | 说明                 |
  | ---- | ---- | -------------------- |
  | w    | word | 向后移动一个单词     |
  | b    | back | 向前移动一个单词     |
  | $    |      | 移动到行尾           |
  | ^    |      | 移动到行首（非空白） |
  | 0    |      | 移动到行首           |

- 移动

  | 命令               | 全称   | 说明                         |
  | ------------------ | ------ | ---------------------------- |
  | gg                 |        | 移动到首行行首               |
  | G                  |        | 移动到末行行首               |
  | 数字gg/数字G/:数字 |        | 移动到指定行的行首           |
  | H                  | head   | 移动到页面顶端的行首         |
  | M                  | middle | 移动到页面中间的行首         |
  | L                  | low    | 移动到页面底部的行首         |
  | {                  |        | 移动到上一段（空行分离段落） |
  | }                  |        | 移动到下一段（空行分离段落） |

- 翻页

  | 命令   | 全称   | 说明       |
  | ------ | ------ | ---------- |
  | ctrl+b | before | 向上翻页   |
  | ctrl+f | after  | 向下翻页   |
  | ctrl+u | up     | 向上翻半页 |
  | ctrl+d | down   | 向下翻半页 |

- 复制-粘贴-剪切/删除

  | 命令   | 全称  | 说明                                     |
  | ------ | ----- | ---------------------------------------- |
  | yy     |       | 复制当前行                               |
  | 数字yy |       | 从当前光标所在行（包含）向下，复制指定行 |
  | p      | paste | 在当前行下方粘贴                         |
  | P      | paste | 在当前行上方粘贴                         |
  | x      |       | 剪切当前字符                             |
  | dd     |       | 剪切当前行，下行上移                     |
  | 数字dd |       | 剪切多行内容，下行上移                   |
  | D      |       | 删除行保留空白                           |

- 撤销

  | 命令   | 全称 | 说明 |
  | ------ | ---- | ---- |
  | u      | undo | 撤销 |
  | ctrl+r | redo | 重做 |

- 括号匹配

  | 命令 | 全称 | 说明     |
  | ---- | ---- | -------- |
  | %    |      | 匹配括号 |

- 标记

  | 命令      | 全称 | 说明       |
  | --------- | ---- | ---------- |
  | m[a-zA-Z] |      | 设置标记   |
  | '[a-zA-Z] |      | 跳转到标记 |

- 替换

  | 命令 | 全称    | 说明                                   |
  | ---- | ------- | -------------------------------------- |
  | r    | replace | 替换一个字符                           |
  | R    | replace | 从当前位置替换多个字符输入（替换模式） |

- 缩进

  | 命令 | 全称 | 说明     |
  | ---- | ---- | -------- |
  | >>   |      | 向右缩进 |
  | <<   |      | 向左缩进 |

- 重复上一步命令

  | 命令 | 全称 | 说明           |
  | ---- | ---- | -------------- |
  | .    |      | 重复上一步操作 |

  
