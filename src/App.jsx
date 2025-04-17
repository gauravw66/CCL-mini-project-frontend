import React, { useState } from 'react';
import { executeCode } from './api/config';
import styles from './App.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python3');
    const [output, setOutput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsExecuting(true);
            setOutput('Executing code...');
            const response = await executeCode(code, language);
            setOutput(response.output);
        } catch (error) {
            console.error(error);
            setOutput('Error executing code');
        } finally {
            setIsExecuting(false);
        }
    };

    // Map JDoodle language codes to syntax highlighter language codes
    const languageMap = {
        'python3': 'python',
        'cpp': 'cpp',
        'java': 'java'
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Online Code Compiler CCL - mini project</h1>
            </header>
            
            <div className={styles.editorContainer}>
                <div className={styles.leftPanel}>
                    <div className={styles.controls}>
                        <select 
                            className={styles.select}
                            onChange={(e) => setLanguage(e.target.value)} 
                            value={language}
                        >
                            <option value="python3">Python</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                        </select>
                        <button 
                            className={styles.button}
                            onClick={handleSubmit}
                            disabled={isExecuting}
                        >
                            {isExecuting ? 'Running...' : 'Run Code'}
                        </button>
                    </div>
                    <div className={styles.editorWrapper}>
                        <textarea
                            className={styles.editor}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                            spellCheck="false"
                        />
                        <SyntaxHighlighter
                            language={languageMap[language]}
                            style={vscDarkPlus}
                            className={styles.syntaxHighlighter}
                            customStyle={{
                                margin: 0,
                                padding: '15px',
                                background: 'transparent',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                pointerEvents: 'none'
                            }}
                        >
                            {code || ' '}
                        </SyntaxHighlighter>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.output}>
                        <h3 className={styles.outputHeader}>Output</h3>
                        <pre className={styles.outputContent}>{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
