const fs = require('fs')
const Path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

module.exports = class Webpack {
  constructor(params) {
    const { entry, output } = params
    this.entry = entry
    this.output = output
  }
  run() {
    this.parse(this.entry)
  }
  parse(entry) {
    const content = fs.readFileSync(entry, 'utf-8')
    const AST = parser.parse(content, {
      sourceType: 'module'
    })
    const dependents = {}
    traverse(AST, {
      ImportDeclaration({ node }) {
        const newFilePath = Path.join(Path.dirname(entry), node.source.value)
        dependents[node.source.value] = newFilePath
      }
    })
    const { code } = babel.transformFromAst(AST, null, {
      presets: ['@babel/preset-env']
    })
    console.log(code)
    return {
      entry,
      dependents,
      code
    }
  }
}
