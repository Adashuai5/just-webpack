const fs = require('fs')
const Path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

module.exports = class Webpack {
  constructor (params) {
    const { entry, output } = params
    this.entry = entry
    this.output = output
    this.modules = []
  }
  run () {
    const info = this.parse(this.entry)
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const { dependents } = this.modules[i]
      if (dependents) {
        for (let j in dependents) {
          this.modules.push(this.parse(dependents[j]))
        }
      }
    }
    const graph = {}
    this.modules.forEach((item) => {
      graph[item.entry] = {
        code: item.code,
        dependents: item.dependents
      }
    })
    this.getFile(graph)
  }
  parse (entry) {
    const content = fs.readFileSync(entry, 'utf-8')
    const AST = parser.parse(content, {
      sourceType: 'module'
    })
    const dependents = {}
    traverse(AST, {
      ImportDeclaration ({ node }) {
        const newFilePath = Path.join(Path.dirname(entry), node.source.value)
        dependents[node.source.value] = newFilePath
      }
    })
    const { code } = babel.transformFromAst(AST, null, {
      presets: ['@babel/preset-env']
    })
    return {
      entry,
      dependents,
      code
    }
  }
  getFile (graph) {
    const parseGraph = JSON.stringify(graph)
    const outputFile = Path.join(this.output.path, this.output.filename)
    const bundles = `
    (function(parseGraph) {
      function require(fileName) {
        function localRequire(params) {
          return require(parseGraph[fileName].dependents[params])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, parseGraph[fileName].code);
        return exports;
      }
      require("${this.entry}")
    })(${parseGraph})
    `
    fs.writeFileSync(outputFile, bundles, 'utf-8')
  }
}